using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M05 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                table: "AspNetUserTokens");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUserLogins");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUserClaims");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoleClaims");

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    NormalizedName = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false)
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
                    { "5ae9fc88-28a0-4a66-9c85-dded3b0b6786", 0, "20cf81c7-fbe3-4fa3-a321-d3b56df299e2", new DateTime(2019, 11, 27, 1, 38, 55, 349, DateTimeKind.Local).AddTicks(7278), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "55596cb0-046d-4354-8863-ea0296c85d71", 2, false, "RescatorX" },
                    { "8793c77a-3749-4711-8810-bf7ea70e53dc", 0, "1dd48590-fb91-459c-9c1a-7357574a2a14", new DateTime(2019, 11, 27, 1, 38, 55, 353, DateTimeKind.Local).AddTicks(5386), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "29d8eb20-0cb9-4902-b346-09c2d61a98d6", 2, false, "jpragr" },
                    { "6a7cc9ea-be7e-433b-82b3-ca578db7950f", 0, "9cc4086d-7357-4d2a-b48a-adc42fd9089c", new DateTime(2019, 11, 27, 1, 38, 55, 353, DateTimeKind.Local).AddTicks(5708), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "d90c2b46-265a-4362-9938-bba45d2f334c", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName", "Status" },
                values: new object[,]
                {
                    { "a82e8f03-e142-4801-9a39-bac21e82cd99", "8d540512-83d2-4d02-936b-608e73468df9", "Administrators role", "Admin", "ADMIN", 1 },
                    { "a3cc84dd-b9ce-438f-a9c2-e3b70085f147", "430a73a0-7282-419e-b906-283cfb97c4e5", "Stylists role", "Stylist", "STYLIST", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "5ae9fc88-28a0-4a66-9c85-dded3b0b6786", "a82e8f03-e142-4801-9a39-bac21e82cd99", "UserRole", new DateTime(2019, 11, 27, 1, 38, 55, 353, DateTimeKind.Local).AddTicks(6624) },
                    { "8793c77a-3749-4711-8810-bf7ea70e53dc", "a82e8f03-e142-4801-9a39-bac21e82cd99", "UserRole", new DateTime(2019, 11, 27, 1, 38, 55, 353, DateTimeKind.Local).AddTicks(7718) },
                    { "8793c77a-3749-4711-8810-bf7ea70e53dc", "a3cc84dd-b9ce-438f-a9c2-e3b70085f147", "UserRole", new DateTime(2019, 11, 27, 1, 38, 55, 353, DateTimeKind.Local).AddTicks(7966) },
                    { "6a7cc9ea-be7e-433b-82b3-ca578db7950f", "a3cc84dd-b9ce-438f-a9c2-e3b70085f147", "UserRole", new DateTime(2019, 11, 27, 1, 38, 55, 353, DateTimeKind.Local).AddTicks(8017) }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_Role_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_Role_RoleId",
                table: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "5ae9fc88-28a0-4a66-9c85-dded3b0b6786", "a82e8f03-e142-4801-9a39-bac21e82cd99" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "6a7cc9ea-be7e-433b-82b3-ca578db7950f", "a3cc84dd-b9ce-438f-a9c2-e3b70085f147" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "8793c77a-3749-4711-8810-bf7ea70e53dc", "a3cc84dd-b9ce-438f-a9c2-e3b70085f147" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "8793c77a-3749-4711-8810-bf7ea70e53dc", "a82e8f03-e142-4801-9a39-bac21e82cd99" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5ae9fc88-28a0-4a66-9c85-dded3b0b6786");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6a7cc9ea-be7e-433b-82b3-ca578db7950f");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8793c77a-3749-4711-8810-bf7ea70e53dc");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserTokens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserLogins",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserClaims",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AspNetRoles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AspNetRoles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoleClaims",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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
    }
}
