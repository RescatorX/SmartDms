using System;
using System.Collections.Generic;
using System.Configuration;

using IdentityServer4.EntityFramework.Options;

using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using SmartDmsCommon.Extensions;
using SmartDmsCommon.Utils;
using SmartDmsData.Entities;
using SmartDmsData.Enums;

namespace SmartDmsData
{
    public class SmartDmsDbContext : ApiAuthorizationDbContext<User>
    {
        public SmartDmsDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<AuditTrail> AuditTrails { get; set; }
        public DbSet<Document> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AuditTrail>().ToTable("AuditTrail");
            modelBuilder.Entity<Document>().ToTable("Document");

            modelBuilder.Entity<User>(b =>
            {
                b.Property(u => u.UserName).HasMaxLength(128);
                b.Property(u => u.NormalizedUserName).HasMaxLength(128);
                b.Property(u => u.Email).HasMaxLength(128);
                b.Property(u => u.NormalizedEmail).HasMaxLength(128);

                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
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
            });

            // Seed initial data

            Role adminRole = null;
            Role stylistRole = null;
            try
            {
                adminRole = new Role()
                {
                    Id = Guid.NewGuid().ToString("D"),
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    Description = "Administrators role",
                    Status = RoleStatus.Enabled
                };
                modelBuilder.Entity<Role>().HasData(adminRole);

                stylistRole = new Role()
                {
                    Id = Guid.NewGuid().ToString("D"),
                    Name = "Stylist",
                    NormalizedName = "STYLIST",
                    Description = "Stylists role",
                    Status = RoleStatus.Enabled
                };
                modelBuilder.Entity<Role>().HasData(stylistRole);
            }
            catch (Exception e)
            {
                throw new Exception("PrefillDatabase - Roles table prefill error: " + e.Message, e);
            }

            List<UserRole> adminUserRoles = new List<UserRole>();

            User adminUser1 = null;
            User adminUser2 = null;
            User adminUser3 = null;
            try
            {
                adminUser1 = new User()
                {
                    Id = Guid.NewGuid().ToString("D"),
                    FirstName = "Miroslav",
                    LastName = "Kalina",
                    UserName = "RescatorX",
                    NormalizedUserName = "RESCATORX",
                    Email = "xkalinam@email.cz",
                    NormalizedEmail = "XKALINAM@EMAIL.CZ",
                    EmailConfirmed = true,
                    TwoFactorEnabled = false,
                    PhoneNumber = "123456789",
                    PhoneNumberConfirmed = true,
                    AccessFailedCount = 0,
                    UserRoles = adminUserRoles,
                    PasswordHash = Constants.DefaultAdminPassword.ComputeSHA256Hash(),
                    Created = DateTime.Now,
                    Status = UserStatus.Verified,
                    DefaultColor = "lightgreen"
                };
                modelBuilder.Entity<User>().HasData(adminUser1);

                adminUser2 = new User()
                {
                    Id = Guid.NewGuid().ToString("D"),
                    FirstName = "Jiří",
                    LastName = "Prágr",
                    UserName = "jpragr",
                    NormalizedUserName = "JPRAGR",
                    Email = "jiri.pragr@seznam.cz",
                    NormalizedEmail = "JIRI.PRAGR@SEZNAM.CZ",
                    EmailConfirmed = true,
                    TwoFactorEnabled = false,
                    PhoneNumber = "987654321",
                    PhoneNumberConfirmed = true,
                    AccessFailedCount = 0,
                    UserRoles = adminUserRoles,
                    PasswordHash = Constants.DefaultAdminPassword.ComputeSHA256Hash(),
                    Created = DateTime.Now,
                    Status = UserStatus.Verified,
                    DefaultColor = "lightblue"
                };
                modelBuilder.Entity<User>().HasData(adminUser2);

                adminUser3 = new User()
                {
                    Id = Guid.NewGuid().ToString("D"),
                    FirstName = "Sandra",
                    LastName = "Nisterová",
                    UserName = "snisterova",
                    NormalizedUserName = "SNISTEROVA",
                    Email = "sandra.nisterova@seznam.cz",
                    NormalizedEmail = "SANDRA.NISTEROVA@SEZNAM.CZ",
                    EmailConfirmed = true,
                    TwoFactorEnabled = false,
                    PhoneNumber = "666555444",
                    PhoneNumberConfirmed = true,
                    AccessFailedCount = 0,
                    UserRoles = adminUserRoles,
                    PasswordHash = Constants.DefaultAdminPassword.ComputeSHA256Hash(),
                    Created = DateTime.Now,
                    Status = UserStatus.Verified,
                    DefaultColor = "pink"
                };
                modelBuilder.Entity<User>().HasData(adminUser3);
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

                UserRole adminUserRole2 = new UserRole()
                {
                    UserId = adminUser2.Id,
                    RoleId = adminRole.Id,
                    Added = DateTime.Now
                };
                modelBuilder.Entity<UserRole>().HasData(adminUserRole2);

                UserRole stylistUserRole1 = new UserRole()
                {
                    UserId = adminUser2.Id,
                    RoleId = stylistRole.Id,
                    Added = DateTime.Now
                };
                modelBuilder.Entity<UserRole>().HasData(stylistUserRole1);

                UserRole stylistUserRole2 = new UserRole()
                {
                    UserId = adminUser3.Id,
                    RoleId = stylistRole.Id,
                    Added = DateTime.Now
                };
                modelBuilder.Entity<UserRole>().HasData(stylistUserRole2);
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
    }
}
