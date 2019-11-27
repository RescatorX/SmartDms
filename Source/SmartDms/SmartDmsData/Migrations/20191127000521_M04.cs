using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoleClaims_Role_RoleId",
                table: "AspNetRoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_Role_RoleId",
                table: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "Role");

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

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoles",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AspNetRoles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AspNetRoles",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName", "Description", "Status" },
                values: new object[,]
                {
                    { "ae8a7185-2050-4ed0-b5d6-fdfe9ebeff9f", "112b0e5a-97cd-422c-aec8-1024c2576aa4", "Role", "Admin", "ADMIN", "Administrators role", 1 },
                    { "9fc0ee0e-37cb-4eae-ad5a-5daa7d20651a", "be856db0-2ab7-4ee4-8252-785fcc68f1c1", "Role", "Stylist", "STYLIST", "Stylists role", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Created", "DefaultColor", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "ce549678-0f75-42c9-b5a5-561e84f8b299", 0, "d8707026-583a-4e02-947f-ca40e61b2709", new DateTime(2019, 11, 27, 1, 5, 20, 932, DateTimeKind.Local).AddTicks(2586), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "bf7fdc11-12fe-49cf-9385-55f4b135fcf1", 2, false, "RescatorX" },
                    { "063912fc-3d01-494d-9fa2-fe44eb943dd7", 0, "0f9bc86f-386a-4376-b62b-7910763e40f9", new DateTime(2019, 11, 27, 1, 5, 20, 935, DateTimeKind.Local).AddTicks(8510), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "f6e4cc28-ccce-4675-95ef-62fa62e37667", 2, false, "jpragr" },
                    { "11377978-e0d5-45db-a4ac-3381e007d2bc", 0, "f0a47472-5a67-4758-873c-63403c9ee02f", new DateTime(2019, 11, 27, 1, 5, 20, 935, DateTimeKind.Local).AddTicks(8763), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "f4769b10-c55a-40ec-9dda-747d8ca9627b", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "ce549678-0f75-42c9-b5a5-561e84f8b299", "ae8a7185-2050-4ed0-b5d6-fdfe9ebeff9f", "UserRole", new DateTime(2019, 11, 27, 1, 5, 20, 935, DateTimeKind.Local).AddTicks(9660) },
                    { "063912fc-3d01-494d-9fa2-fe44eb943dd7", "ae8a7185-2050-4ed0-b5d6-fdfe9ebeff9f", "UserRole", new DateTime(2019, 11, 27, 1, 5, 20, 936, DateTimeKind.Local).AddTicks(737) },
                    { "063912fc-3d01-494d-9fa2-fe44eb943dd7", "9fc0ee0e-37cb-4eae-ad5a-5daa7d20651a", "UserRole", new DateTime(2019, 11, 27, 1, 5, 20, 936, DateTimeKind.Local).AddTicks(813) },
                    { "11377978-e0d5-45db-a4ac-3381e007d2bc", "9fc0ee0e-37cb-4eae-ad5a-5daa7d20651a", "UserRole", new DateTime(2019, 11, 27, 1, 5, 20, 936, DateTimeKind.Local).AddTicks(849) }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserTokens",
                columns: new[] { "UserId", "LoginProvider", "Name", "Discriminator", "Value" },
                values: new object[,]
                {
                    { "ce549678-0f75-42c9-b5a5-561e84f8b299", "SmartDmsLoginProvider", "Token1", "UserToken", "Token1" },
                    { "063912fc-3d01-494d-9fa2-fe44eb943dd7", "SmartDmsLoginProvider", "Token2", "UserToken", "Token2" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoleClaims_AspNetRoles_RoleId1",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoleClaims_AspNetRoles_RoleId1",
                table: "AspNetRoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "063912fc-3d01-494d-9fa2-fe44eb943dd7", "9fc0ee0e-37cb-4eae-ad5a-5daa7d20651a" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "063912fc-3d01-494d-9fa2-fe44eb943dd7", "ae8a7185-2050-4ed0-b5d6-fdfe9ebeff9f" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "11377978-e0d5-45db-a4ac-3381e007d2bc", "9fc0ee0e-37cb-4eae-ad5a-5daa7d20651a" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "ce549678-0f75-42c9-b5a5-561e84f8b299", "ae8a7185-2050-4ed0-b5d6-fdfe9ebeff9f" });

            migrationBuilder.DeleteData(
                table: "AspNetUserTokens",
                keyColumns: new[] { "UserId", "LoginProvider", "Name" },
                keyValues: new object[] { "063912fc-3d01-494d-9fa2-fe44eb943dd7", "SmartDmsLoginProvider", "Token2" });

            migrationBuilder.DeleteData(
                table: "AspNetUserTokens",
                keyColumns: new[] { "UserId", "LoginProvider", "Name" },
                keyValues: new object[] { "ce549678-0f75-42c9-b5a5-561e84f8b299", "SmartDmsLoginProvider", "Token1" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9fc0ee0e-37cb-4eae-ad5a-5daa7d20651a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ae8a7185-2050-4ed0-b5d6-fdfe9ebeff9f");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "063912fc-3d01-494d-9fa2-fe44eb943dd7");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "11377978-e0d5-45db-a4ac-3381e007d2bc");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "ce549678-0f75-42c9-b5a5-561e84f8b299");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AspNetRoles");

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

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

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoleClaims_Role_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_Role_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
