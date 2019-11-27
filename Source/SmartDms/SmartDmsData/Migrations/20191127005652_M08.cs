using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M08 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "1df7c091-4ee9-4313-83e4-7c3ebc3c1f73", "1ad10ccd-7cc4-4cb9-bc4e-e8e157740d7c" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "1df7c091-4ee9-4313-83e4-7c3ebc3c1f73", "90e40819-257d-44cd-b1fe-90e6041bf40c" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "d783fc08-1637-40fa-8aa4-32e852ed3db4", "1ad10ccd-7cc4-4cb9-bc4e-e8e157740d7c" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "de2902bf-7d37-419a-afb8-c7321b34fccb", "90e40819-257d-44cd-b1fe-90e6041bf40c" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ad10ccd-7cc4-4cb9-bc4e-e8e157740d7c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "90e40819-257d-44cd-b1fe-90e6041bf40c");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1df7c091-4ee9-4313-83e4-7c3ebc3c1f73");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d783fc08-1637-40fa-8aa4-32e852ed3db4");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "de2902bf-7d37-419a-afb8-c7321b34fccb");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName", "Description", "Status" },
                values: new object[,]
                {
                    { "fae1c89e-afa2-4960-90fd-e6f229edf50d", "7aed1d71-80a7-4956-836a-4fd24a2ecf70", "Role", "Admin", "ADMIN", "Administrators role", 1 },
                    { "68be4225-23d0-4e1f-a789-782abd1e1c29", "67abe7d7-bec9-4012-aef4-265c06e24c62", "Role", "Stylist", "STYLIST", "Stylists role", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Created", "DefaultColor", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "4821f4a7-d77f-45b6-ac3a-34c12be19beb", 0, "366ad284-1ef3-40e0-8cb0-212898361eac", new DateTime(2019, 11, 27, 1, 56, 52, 68, DateTimeKind.Local).AddTicks(3742), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "df8681b9-e035-4a66-8d36-c84744bd41eb", 2, false, "RescatorX" },
                    { "bcf87716-5454-4b99-8068-31b84e2d8aef", 0, "ff25d3df-0ad1-46b4-9e1f-055ed9f1515d", new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(544), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "5af78812-d916-4da0-93dc-6c4a3e3018c9", 2, false, "jpragr" },
                    { "374f66ab-ea47-4a7b-9022-ba6e567a2afb", 0, "d5b4a88d-8172-459d-94ac-4f44d0100f91", new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(790), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "bd5ae5f9-80e0-449f-87c5-c5784e6c0a1b", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "4821f4a7-d77f-45b6-ac3a-34c12be19beb", "fae1c89e-afa2-4960-90fd-e6f229edf50d", "UserRole", new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(1777) },
                    { "bcf87716-5454-4b99-8068-31b84e2d8aef", "fae1c89e-afa2-4960-90fd-e6f229edf50d", "UserRole", new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(3052) },
                    { "bcf87716-5454-4b99-8068-31b84e2d8aef", "68be4225-23d0-4e1f-a789-782abd1e1c29", "UserRole", new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(3133) },
                    { "374f66ab-ea47-4a7b-9022-ba6e567a2afb", "68be4225-23d0-4e1f-a789-782abd1e1c29", "UserRole", new DateTime(2019, 11, 27, 1, 56, 52, 72, DateTimeKind.Local).AddTicks(3173) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "374f66ab-ea47-4a7b-9022-ba6e567a2afb", "68be4225-23d0-4e1f-a789-782abd1e1c29" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "4821f4a7-d77f-45b6-ac3a-34c12be19beb", "fae1c89e-afa2-4960-90fd-e6f229edf50d" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "bcf87716-5454-4b99-8068-31b84e2d8aef", "68be4225-23d0-4e1f-a789-782abd1e1c29" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "bcf87716-5454-4b99-8068-31b84e2d8aef", "fae1c89e-afa2-4960-90fd-e6f229edf50d" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "68be4225-23d0-4e1f-a789-782abd1e1c29");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fae1c89e-afa2-4960-90fd-e6f229edf50d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "374f66ab-ea47-4a7b-9022-ba6e567a2afb");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4821f4a7-d77f-45b6-ac3a-34c12be19beb");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "bcf87716-5454-4b99-8068-31b84e2d8aef");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName", "Description", "Status" },
                values: new object[,]
                {
                    { "90e40819-257d-44cd-b1fe-90e6041bf40c", "4d5a7935-364e-4708-885b-dea43d452afe", "Role", "Admin", "ADMIN", "Administrators role", 1 },
                    { "1ad10ccd-7cc4-4cb9-bc4e-e8e157740d7c", "f89a1251-9c83-4280-96cc-a3045298830d", "Role", "Stylist", "STYLIST", "Stylists role", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Created", "DefaultColor", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "de2902bf-7d37-419a-afb8-c7321b34fccb", 0, "90995b5a-350e-4da0-9400-995a8d56731e", new DateTime(2019, 11, 27, 1, 53, 22, 563, DateTimeKind.Local).AddTicks(7844), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "c6149974-0173-4bc6-863a-6e747501d572", 2, false, "RescatorX" },
                    { "1df7c091-4ee9-4313-83e4-7c3ebc3c1f73", 0, "e77cae4f-af2a-4748-86d5-290618c50c15", new DateTime(2019, 11, 27, 1, 53, 22, 567, DateTimeKind.Local).AddTicks(7387), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "36a9ed5c-008d-484a-aab5-7aa21c7deac9", 2, false, "jpragr" },
                    { "d783fc08-1637-40fa-8aa4-32e852ed3db4", 0, "166496d0-1153-470c-9e41-6f870de7c17f", new DateTime(2019, 11, 27, 1, 53, 22, 567, DateTimeKind.Local).AddTicks(7828), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "0520da65-5bf7-4de9-8431-46c949304745", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "de2902bf-7d37-419a-afb8-c7321b34fccb", "90e40819-257d-44cd-b1fe-90e6041bf40c", "UserRole", new DateTime(2019, 11, 27, 1, 53, 22, 567, DateTimeKind.Local).AddTicks(8858) },
                    { "1df7c091-4ee9-4313-83e4-7c3ebc3c1f73", "90e40819-257d-44cd-b1fe-90e6041bf40c", "UserRole", new DateTime(2019, 11, 27, 1, 53, 22, 568, DateTimeKind.Local).AddTicks(8) },
                    { "1df7c091-4ee9-4313-83e4-7c3ebc3c1f73", "1ad10ccd-7cc4-4cb9-bc4e-e8e157740d7c", "UserRole", new DateTime(2019, 11, 27, 1, 53, 22, 568, DateTimeKind.Local).AddTicks(115) },
                    { "d783fc08-1637-40fa-8aa4-32e852ed3db4", "1ad10ccd-7cc4-4cb9-bc4e-e8e157740d7c", "UserRole", new DateTime(2019, 11, 27, 1, 53, 22, 568, DateTimeKind.Local).AddTicks(159) }
                });
        }
    }
}
