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
        public new DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AuditTrail>().ToTable("AuditTrail");
            modelBuilder.Entity<Document>().ToTable("Document");
/*
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
*/
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
