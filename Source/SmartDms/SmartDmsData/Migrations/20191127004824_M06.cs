using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartDmsData.Migrations
{
    public partial class M06 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "a3cc84dd-b9ce-438f-a9c2-e3b70085f147");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "a82e8f03-e142-4801-9a39-bac21e82cd99");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "020c872f-d7ca-4bbb-888d-a2833bde75c8");

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: "fa0e097c-6add-4d32-a030-4a066dc5c669");

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
        }
    }
}
