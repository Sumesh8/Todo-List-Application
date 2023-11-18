using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TodoList.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Initialmigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Email = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    LastName = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    Password = table.Column<string>(type: "TEXT", maxLength: 12, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Email);
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Email", "FirstName", "LastName", "Password" },
                values: new object[,]
                {
                    { "kvmedhathisari@gmail.com", "Medha", "Thisari", "123" },
                    { "kvmeghathilini@gmail.com", "Megha", "Thilini", "123" },
                    { "kvsudeshanuradha@gmail.com", "Sudesh", "Anuradha", "123" },
                    { "kvsumeshakalanka@gmail.com", "Sumesh", "Akalanka", "123" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
