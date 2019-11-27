﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SmartDmsData;

namespace SmartDmsData.Migrations
{
    [DbContext(typeof(SmartDmsDbContext))]
    partial class SmartDmsDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasMaxLength(50000);

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.HasKey("UserCode");

                    b.HasIndex("DeviceCode")
                        .IsUnique();

                    b.HasIndex("Expiration");

                    b.ToTable("DeviceCodes");
                });

            modelBuilder.Entity("IdentityServer4.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasMaxLength(50000);

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Key");

                    b.HasIndex("Expiration");

                    b.HasIndex("SubjectId", "ClientId", "Type");

                    b.ToTable("PersistedGrants");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUserRole<string>");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("SmartDmsData.Entities.AuditTrail", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Operation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AuditTrail");
                });

            modelBuilder.Entity("SmartDmsData.Entities.Document", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Barcode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Operation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OriginalName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Document");
                });

            modelBuilder.Entity("SmartDmsData.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("DefaultColor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasData(
                        new
                        {
                            Id = "4821f4a7-d77f-45b6-ac3a-34c12be19beb",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "366ad284-1ef3-40e0-8cb0-212898361eac",
                            Created = new DateTime(2019, 11, 27, 1, 56, 52, 68, DateTimeKind.Local).AddTicks(3742),
                            DefaultColor = "lightgreen",
                            Email = "xkalinam@email.cz",
                            EmailConfirmed = true,
                            FirstName = "Miroslav",
                            LastName = "Kalina",
                            LockoutEnabled = false,
                            NormalizedEmail = "XKALINAM@EMAIL.CZ",
                            NormalizedUserName = "RESCATORX",
                            PasswordHash = "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892",
                            PhoneNumber = "123456789",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "df8681b9-e035-4a66-8d36-c84744bd41eb",
                            Status = 2,
                            TwoFactorEnabled = false,
                            UserName = "RescatorX"
                        },
                        new
                        {
                            Id = "bcf87716-5454-4b99-8068-31b84e2d8aef",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "ff25d3df-0ad1-46b4-9e1f-055ed9f1515d",
                            Created = new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(544),
                            DefaultColor = "lightblue",
                            Email = "jiri.pragr@seznam.cz",
                            EmailConfirmed = true,
                            FirstName = "Jiří",
                            LastName = "Prágr",
                            LockoutEnabled = false,
                            NormalizedEmail = "JIRI.PRAGR@SEZNAM.CZ",
                            NormalizedUserName = "JPRAGR",
                            PasswordHash = "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892",
                            PhoneNumber = "987654321",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "5af78812-d916-4da0-93dc-6c4a3e3018c9",
                            Status = 2,
                            TwoFactorEnabled = false,
                            UserName = "jpragr"
                        },
                        new
                        {
                            Id = "374f66ab-ea47-4a7b-9022-ba6e567a2afb",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "d5b4a88d-8172-459d-94ac-4f44d0100f91",
                            Created = new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(790),
                            DefaultColor = "pink",
                            Email = "sandra.nisterova@seznam.cz",
                            EmailConfirmed = true,
                            FirstName = "Sandra",
                            LastName = "Nisterová",
                            LockoutEnabled = false,
                            NormalizedEmail = "SANDRA.NISTEROVA@SEZNAM.CZ",
                            NormalizedUserName = "SNISTEROVA",
                            PasswordHash = "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892",
                            PhoneNumber = "666555444",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "bd5ae5f9-80e0-449f-87c5-c5784e6c0a1b",
                            Status = 2,
                            TwoFactorEnabled = false,
                            UserName = "snisterova"
                        });
                });

            modelBuilder.Entity("SmartDmsData.Entities.Role", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("Role");

                    b.HasData(
                        new
                        {
                            Id = "fae1c89e-afa2-4960-90fd-e6f229edf50d",
                            ConcurrencyStamp = "7aed1d71-80a7-4956-836a-4fd24a2ecf70",
                            Name = "Admin",
                            NormalizedName = "ADMIN",
                            Description = "Administrators role",
                            Status = 1
                        },
                        new
                        {
                            Id = "68be4225-23d0-4e1f-a789-782abd1e1c29",
                            ConcurrencyStamp = "67abe7d7-bec9-4012-aef4-265c06e24c62",
                            Name = "Stylist",
                            NormalizedName = "STYLIST",
                            Description = "Stylists role",
                            Status = 1
                        });
                });

            modelBuilder.Entity("SmartDmsData.Entities.UserRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUserRole<string>");

                    b.Property<DateTime>("Added")
                        .HasColumnType("datetime2");

                    b.HasDiscriminator().HasValue("UserRole");

                    b.HasData(
                        new
                        {
                            UserId = "4821f4a7-d77f-45b6-ac3a-34c12be19beb",
                            RoleId = "fae1c89e-afa2-4960-90fd-e6f229edf50d",
                            Added = new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(1777)
                        },
                        new
                        {
                            UserId = "bcf87716-5454-4b99-8068-31b84e2d8aef",
                            RoleId = "fae1c89e-afa2-4960-90fd-e6f229edf50d",
                            Added = new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(3052)
                        },
                        new
                        {
                            UserId = "bcf87716-5454-4b99-8068-31b84e2d8aef",
                            RoleId = "68be4225-23d0-4e1f-a789-782abd1e1c29",
                            Added = new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(3133)
                        },
                        new
                        {
                            UserId = "374f66ab-ea47-4a7b-9022-ba6e567a2afb",
                            RoleId = "68be4225-23d0-4e1f-a789-782abd1e1c29",
                            Added = new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(3173)
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("SmartDmsData.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("SmartDmsData.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("SmartDmsData.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartDmsData.Entities.AuditTrail", b =>
                {
                    b.HasOne("SmartDmsData.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("SmartDmsData.Entities.Document", b =>
                {
                    b.HasOne("SmartDmsData.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("SmartDmsData.Entities.UserRole", b =>
                {
                    b.HasOne("SmartDmsData.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_AspNetUserRoles_AspNetRoles_RoleId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartDmsData.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
