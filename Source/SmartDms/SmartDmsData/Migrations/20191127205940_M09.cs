using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M09 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "DefaultColor",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefaultColor",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

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
    }
}
