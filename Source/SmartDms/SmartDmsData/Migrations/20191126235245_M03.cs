using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "15045db7-d628-4b9f-9363-afd9214c9eb3", "e02dfb4e-a5e0-4c91-a542-6da987c5947d" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "d48e7d77-8baf-49af-b667-58bfa9a68ab0", "d912a016-cf37-425e-8fed-13dc647cfc04" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "f2b08d36-57f5-4811-ad61-03c93645132e", "d912a016-cf37-425e-8fed-13dc647cfc04" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "f2b08d36-57f5-4811-ad61-03c93645132e", "e02dfb4e-a5e0-4c91-a542-6da987c5947d" });

            migrationBuilder.DeleteData(
                table: "AspNetUserTokens",
                keyColumns: new[] { "UserId", "LoginProvider", "Name" },
                keyValues: new object[] { "d48e7d77-8baf-49af-b667-58bfa9a68ab0", "SmartDmsLoginProvider", "Token1" });

            migrationBuilder.DeleteData(
                table: "AspNetUserTokens",
                keyColumns: new[] { "UserId", "LoginProvider", "Name" },
                keyValues: new object[] { "f2b08d36-57f5-4811-ad61-03c93645132e", "SmartDmsLoginProvider", "Token2" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "15045db7-d628-4b9f-9363-afd9214c9eb3");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d48e7d77-8baf-49af-b667-58bfa9a68ab0");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f2b08d36-57f5-4811-ad61-03c93645132e");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "d912a016-cf37-425e-8fed-13dc647cfc04");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "e02dfb4e-a5e0-4c91-a542-6da987c5947d");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Created", "DefaultColor", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "06f7ccee-d730-425a-acfa-4524ac88448e", 0, "410d74a7-cda3-422b-afb6-e4806e4cd9d4", new DateTime(2019, 11, 27, 0, 52, 44, 480, DateTimeKind.Local).AddTicks(1804), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "d78248ed-8060-4ee3-91a8-f0ccfe3e62a7", 2, false, "RescatorX" },
                    { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", 0, "130e80f1-31ca-4dc5-86a0-636df66c6468", new DateTime(2019, 11, 27, 0, 52, 44, 483, DateTimeKind.Local).AddTicks(8415), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "541eefba-0e91-4a6d-9327-75e06ae23487", 2, false, "jpragr" },
                    { "54062a54-1237-41de-9ea6-aa812d2eba14", 0, "01951382-e120-44e8-a626-f8ea7f0f5a8f", new DateTime(2019, 11, 27, 0, 52, 44, 483, DateTimeKind.Local).AddTicks(8782), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "4baccea0-50ab-41a6-bfdf-df6706a8fcbf", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName", "Status" },
                values: new object[,]
                {
                    { "84c823d9-9b42-4797-b0d7-1d25130821eb", "825c2a0d-4a56-4c6e-b69f-fb23b762ae12", "Administrators role", "Admin", "ADMIN", 1 },
                    { "e71ee7b1-44a1-4494-b463-b979449a0482", "2cb650ef-3185-4088-8e30-2609905c9900", "Stylists role", "Stylist", "STYLIST", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "06f7ccee-d730-425a-acfa-4524ac88448e", "84c823d9-9b42-4797-b0d7-1d25130821eb", "UserRole", new DateTime(2019, 11, 27, 0, 52, 44, 483, DateTimeKind.Local).AddTicks(9720) },
                    { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", "84c823d9-9b42-4797-b0d7-1d25130821eb", "UserRole", new DateTime(2019, 11, 27, 0, 52, 44, 484, DateTimeKind.Local).AddTicks(755) },
                    { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", "e71ee7b1-44a1-4494-b463-b979449a0482", "UserRole", new DateTime(2019, 11, 27, 0, 52, 44, 484, DateTimeKind.Local).AddTicks(848) },
                    { "54062a54-1237-41de-9ea6-aa812d2eba14", "e71ee7b1-44a1-4494-b463-b979449a0482", "UserRole", new DateTime(2019, 11, 27, 0, 52, 44, 484, DateTimeKind.Local).AddTicks(895) }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserTokens",
                columns: new[] { "UserId", "LoginProvider", "Name", "Discriminator", "Value" },
                values: new object[,]
                {
                    { "06f7ccee-d730-425a-acfa-4524ac88448e", "SmartDmsLoginProvider", "Token1", "UserToken", "Token1" },
                    { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", "SmartDmsLoginProvider", "Token2", "UserToken", "Token2" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", "84c823d9-9b42-4797-b0d7-1d25130821eb" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", "e71ee7b1-44a1-4494-b463-b979449a0482" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "06f7ccee-d730-425a-acfa-4524ac88448e", "84c823d9-9b42-4797-b0d7-1d25130821eb" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "54062a54-1237-41de-9ea6-aa812d2eba14", "e71ee7b1-44a1-4494-b463-b979449a0482" });

            migrationBuilder.DeleteData(
                table: "AspNetUserTokens",
                keyColumns: new[] { "UserId", "LoginProvider", "Name" },
                keyValues: new object[] { "059f2ef0-3cd6-4204-abef-9c67adcb0c3c", "SmartDmsLoginProvider", "Token2" });

            migrationBuilder.DeleteData(
                table: "AspNetUserTokens",
                keyColumns: new[] { "UserId", "LoginProvider", "Name" },
                keyValues: new object[] { "06f7ccee-d730-425a-acfa-4524ac88448e", "SmartDmsLoginProvider", "Token1" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "059f2ef0-3cd6-4204-abef-9c67adcb0c3c");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "06f7ccee-d730-425a-acfa-4524ac88448e");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "54062a54-1237-41de-9ea6-aa812d2eba14");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "84c823d9-9b42-4797-b0d7-1d25130821eb");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "e71ee7b1-44a1-4494-b463-b979449a0482");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Created", "DefaultColor", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "d48e7d77-8baf-49af-b667-58bfa9a68ab0", 0, "79e829c3-6805-46fd-8ab7-df80ee5c7ea3", new DateTime(2019, 11, 25, 12, 22, 13, 669, DateTimeKind.Local).AddTicks(7503), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "2eb6039e-8cef-40e1-9c4b-234cb5e3079f", 2, false, "RescatorX" },
                    { "f2b08d36-57f5-4811-ad61-03c93645132e", 0, "a83c382d-1b4c-4191-b4a5-9bc07bd766b4", new DateTime(2019, 11, 25, 12, 22, 13, 678, DateTimeKind.Local).AddTicks(8171), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "984cdc03-9b9b-4c61-9c65-5629cec14808", 2, false, "jpragr" },
                    { "15045db7-d628-4b9f-9363-afd9214c9eb3", 0, "7c7777b4-bf11-44d9-8ac7-2df5ec73b109", new DateTime(2019, 11, 25, 12, 22, 13, 678, DateTimeKind.Local).AddTicks(8878), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "d924299c-6063-413a-b5c8-638d2aa5f3c5", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName", "Status" },
                values: new object[,]
                {
                    { "d912a016-cf37-425e-8fed-13dc647cfc04", "3d1b2908-7ecf-4a72-849c-d35149774b62", "Administrators role", "Admin", "ADMIN", 1 },
                    { "e02dfb4e-a5e0-4c91-a542-6da987c5947d", "85230b8e-17bd-4346-8264-f14291a302f5", "Stylists role", "Stylist", "STYLIST", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "d48e7d77-8baf-49af-b667-58bfa9a68ab0", "d912a016-cf37-425e-8fed-13dc647cfc04", "UserRole", new DateTime(2019, 11, 25, 12, 22, 13, 678, DateTimeKind.Local).AddTicks(8878) },
                    { "f2b08d36-57f5-4811-ad61-03c93645132e", "d912a016-cf37-425e-8fed-13dc647cfc04", "UserRole", new DateTime(2019, 11, 25, 12, 22, 13, 678, DateTimeKind.Local).AddTicks(8878) },
                    { "f2b08d36-57f5-4811-ad61-03c93645132e", "e02dfb4e-a5e0-4c91-a542-6da987c5947d", "UserRole", new DateTime(2019, 11, 25, 12, 22, 13, 678, DateTimeKind.Local).AddTicks(8878) },
                    { "15045db7-d628-4b9f-9363-afd9214c9eb3", "e02dfb4e-a5e0-4c91-a542-6da987c5947d", "UserRole", new DateTime(2019, 11, 25, 12, 22, 13, 678, DateTimeKind.Local).AddTicks(8878) }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserTokens",
                columns: new[] { "UserId", "LoginProvider", "Name", "Discriminator", "Value" },
                values: new object[,]
                {
                    { "d48e7d77-8baf-49af-b667-58bfa9a68ab0", "SmartDmsLoginProvider", "Token1", "UserToken", "Token1" },
                    { "f2b08d36-57f5-4811-ad61-03c93645132e", "SmartDmsLoginProvider", "Token2", "UserToken", "Token2" }
                });
        }
    }
}
