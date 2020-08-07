using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading.Tasks;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using SmartDmsCommon.Extensions;
using SmartDmsCommon.Utils;
using SmartDmsData.Entities;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData
{
    public class SmartDmsDbContext : IdentityDbContext<User, Role, Guid, Entities.UserClaim, UserRole, UserLogin, RoleClaim, UserToken>, IPersistedGrantDbContext
    {
        public SmartDmsDbContext(DbContextOptions<SmartDmsDbContext> options)
            : base(options)
        {
        }

        public DbSet<AuditTrail> AuditTrails { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<PersistedGrant> PersistedGrants { get; set; }
        public DbSet<DeviceFlowCodes> DeviceFlowCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AuditTrail>().ToTable("AuditTrail");
            modelBuilder.Entity<Document>(b =>
            {
                b.HasOne(d => d.DocumentTypeRegister)
                    .WithMany(dt => dt.Documents)
                    .HasForeignKey(d => d.DocumentType)
                    .IsRequired();
            });

            modelBuilder.Entity<DocumentTypeRegister>(b =>
            {
                b.HasMany(dt => dt.Documents)
                    .WithOne(d => d.DocumentTypeRegister)
                    .IsRequired();
            });

            modelBuilder.Entity<User>(b =>
            {
                b.Property(u => u.UserName).HasMaxLength(128);
                b.Property(u => u.Email).HasMaxLength(128);
                b.Property(u => u.PhoneNumber).HasMaxLength(128);

                // Each User can have many UserClaims
                b.HasMany(e => e.Claims)
                    .WithOne(e => e.User)
                    .HasForeignKey(uc => uc.UserId)
                    .IsRequired();

                // Each User can have many UserLogins
                b.HasMany(e => e.Logins)
                    .WithOne(e => e.User)
                    .HasForeignKey(ul => ul.UserId)
                    .IsRequired();

                // Each User can have many UserTokens
                b.HasMany(e => e.Tokens)
                    .WithOne(e => e.User)
                    .HasForeignKey(ut => ut.UserId)
                    .IsRequired();

                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();

                // Each User can have many entries in the UserGroup join table
                b.HasMany(e => e.UserGroups)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            modelBuilder.Entity<Role>(b =>
            {
                // Each Role can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                // Each Role can have many associated RoleClaims
                b.HasMany(e => e.RoleClaims)
                    .WithOne(e => e.Role)
                    .HasForeignKey(rc => rc.RoleId)
                    .IsRequired();
            });
            modelBuilder.Entity<Group>(b =>
            {
                // Each Role can have many entries in the UserRole join table
                b.HasMany(e => e.UserGroups)
                    .WithOne(e => e.Group)
                    .HasForeignKey(ur => ur.GroupId)
                    .IsRequired();
            });
            modelBuilder.Entity<UserToken>(b =>
            {
                b.Property(t => t.LoginProvider).HasMaxLength(128);
                b.Property(t => t.Name).HasMaxLength(128);
            });

            // Seed initial data
            Role adminRole = null;
            try
            {
                adminRole = new Role()
                {
                    Id = Guid.NewGuid(),
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    Description = "Administrators role",
                    Status = RoleStatus.Enabled
                };
                modelBuilder.Entity<Role>().HasData(adminRole);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - Roles table prefill error: " + e.Message, e);
            }

            Group readerGroup = null;
            try
            {
                readerGroup = new Group()
                {
                    Id = Guid.NewGuid(),
                    Name = "Readers",
                    ParentGroup = null,
                    Description = "Readers group",
                    Status = RoleStatus.Enabled
                };
                modelBuilder.Entity<Group>().HasData(readerGroup);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - Groups table prefill error: " + e.Message, e);
            }

            List<Entities.UserClaim> adminUserClaims = new List<Entities.UserClaim>();
            List<UserToken> adminUserTokens = new List<UserToken>();
            List<UserRole> adminUserRoles = new List<UserRole>();
            List<UserGroup> adminUserGroups = new List<UserGroup>();

            User adminUser1 = null;
            try
            {
                adminUser1 = new User()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Miroslav",
                    LastName = "Kalina",
                    UserName = "RescatorX",
                    Email = "xkalinam@email.cz",
                    EmailConfirmed = true,
                    Logins = null,
                    TwoFactorEnabled = false,
                    PhoneNumber = "123456789",
                    PhoneNumberConfirmed = true,
                    AccessFailedCount = 0,
                    Claims = adminUserClaims,
                    UserRoles = adminUserRoles,
                    UserGroups = adminUserGroups,
                    Tokens = adminUserTokens,
                    PasswordHash = Constants.DefaultAdminPassword.ComputeSHA256Hash(),
                    Created = DateTime.Now,
                    Status = UserStatus.Verified
                };
                modelBuilder.Entity<User>().HasData(adminUser1);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - Users table prefill error: " + e.Message, e);
            }

            try
            {
                UserRole adminUserRole1 = new UserRole()
                {
                    UserId = adminUser1.Id,
                    RoleId = adminRole.Id,
                    Added = DateTime.Now
                };
                modelBuilder.Entity<UserRole>().HasData(adminUserRole1);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - UserRoles table prefill error: " + e.Message, e);
            }

            try
            {
                UserGroup readerUserGroup1 = new UserGroup()
                {
                    Id = Guid.NewGuid(),
                    UserId = adminUser1.Id,
                    GroupId = readerGroup.Id,
                    Added = DateTime.Now
                };
                modelBuilder.Entity<UserGroup>().HasData(readerUserGroup1);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - UserGroups table prefill error: " + e.Message, e);
            }

            try
            {
                UserToken adminUserToken1 = new UserToken()
                {
                    Name = "Token1",
                    UserId = adminUser1.Id,
                    Value = "Token1",
                    LoginProvider = "SmartDmsWebAppLoginProvider"
                };
                modelBuilder.Entity<UserToken>().HasData(adminUserToken1);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - UserRoles table prefill error: " + e.Message, e);
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                .UseLoggerFactory(GetLoggerFactory())
                .UseSqlServer(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString, providerOptions => {
                    providerOptions.CommandTimeout(60);
                    providerOptions.MigrationsAssembly("SmartDmsData");
                    })
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            }
        }

        private ILoggerFactory GetLoggerFactory()
        {
            IServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.AddLogging(builder => builder.AddConsole().AddFilter(DbLoggerCategory.Database.Command.Name, LogLevel.Information));
            return serviceCollection.BuildServiceProvider().GetService<ILoggerFactory>();
        }

        public Task<int> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
