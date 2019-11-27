using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M07 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_Role_RoleId",
                table: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "a89b5d4d-0d5d-4f45-ac37-6ff9828d5995", "fa0e097c-6add-4d32-a030-4a066dc5c669" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "e5c91afb-720d-4865-b9b2-57df16528a5c", "020c872f-d7ca-4bbb-888d-a2833bde75c8" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "e5c91afb-720d-4865-b9b2-57df16528a5c", "fa0e097c-6add-4d32-a030-4a066dc5c669" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "e7025188-3e32-4f2e-b379-08a4da16777a", "020c872f-d7ca-4bbb-888d-a2833bde75c8" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a89b5d4d-0d5d-4f45-ac37-6ff9828d5995");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e5c91afb-720d-4865-b9b2-57df16528a5c");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e7025188-3e32-4f2e-b379-08a4da16777a");

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
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles");

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
                    { "a89b5d4d-0d5d-4f45-ac37-6ff9828d5995", 0, "aef851d1-351f-48db-bcb5-4ee3d72d8a62", new DateTime(2019, 11, 27, 1, 48, 23, 767, DateTimeKind.Local).AddTicks(1300), "lightgreen", "xkalinam@email.cz", true, "Miroslav", "Kalina", false, null, "XKALINAM@EMAIL.CZ", "RESCATORX", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "123456789", true, "249544e4-1509-44d1-b0f2-a351a714ce8d", 2, false, "RescatorX" },
                    { "e5c91afb-720d-4865-b9b2-57df16528a5c", 0, "1cf65c59-b573-46fa-bfa0-6e70e93aba91", new DateTime(2019, 11, 27, 1, 48, 23, 770, DateTimeKind.Local).AddTicks(6709), "lightblue", "jiri.pragr@seznam.cz", true, "Jiří", "Prágr", false, null, "JIRI.PRAGR@SEZNAM.CZ", "JPRAGR", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "987654321", true, "db1463c8-cf68-4b42-9af0-1db38c5201d6", 2, false, "jpragr" },
                    { "e7025188-3e32-4f2e-b379-08a4da16777a", 0, "7cd91680-a23c-4958-a0c2-2365b7b8b07a", new DateTime(2019, 11, 27, 1, 48, 23, 770, DateTimeKind.Local).AddTicks(6956), "pink", "sandra.nisterova@seznam.cz", true, "Sandra", "Nisterová", false, null, "SANDRA.NISTEROVA@SEZNAM.CZ", "SNISTEROVA", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "666555444", true, "5debee32-e02a-4276-9bf9-4fcbc62fd756", 2, false, "snisterova" }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName", "Status" },
                values: new object[,]
                {
                    { "fa0e097c-6add-4d32-a030-4a066dc5c669", "44f869ed-cd9e-41ea-a730-8372234566d6", "Administrators role", "Admin", "ADMIN", 1 },
                    { "020c872f-d7ca-4bbb-888d-a2833bde75c8", "d23ab50a-c03d-4625-85de-9b0cc551d768", "Stylists role", "Stylist", "STYLIST", 1 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId", "Discriminator", "Added" },
                values: new object[,]
                {
                    { "a89b5d4d-0d5d-4f45-ac37-6ff9828d5995", "fa0e097c-6add-4d32-a030-4a066dc5c669", "UserRole", new DateTime(2019, 11, 27, 1, 48, 23, 770, DateTimeKind.Local).AddTicks(7874) },
                    { "e5c91afb-720d-4865-b9b2-57df16528a5c", "fa0e097c-6add-4d32-a030-4a066dc5c669", "UserRole", new DateTime(2019, 11, 27, 1, 48, 23, 770, DateTimeKind.Local).AddTicks(8905) },
                    { "e5c91afb-720d-4865-b9b2-57df16528a5c", "020c872f-d7ca-4bbb-888d-a2833bde75c8", "UserRole", new DateTime(2019, 11, 27, 1, 48, 23, 770, DateTimeKind.Local).AddTicks(8983) },
                    { "e7025188-3e32-4f2e-b379-08a4da16777a", "020c872f-d7ca-4bbb-888d-a2833bde75c8", "UserRole", new DateTime(2019, 11, 27, 1, 48, 23, 770, DateTimeKind.Local).AddTicks(9022) }
                });

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
