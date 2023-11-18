using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TodoList.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class adddummydatatothetodostable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "Description", "Status", "Tittle", "UserEmail" },
                values: new object[,]
                {
                    { 1, "blaaaa1", 1, "Do assignments", "kvsumeshakalanka@gmail.com" },
                    { 2, "blaaaa2", 0, "Do execices", "kvsumeshakalanka@gmail.com" },
                    { 3, "blaaaa3", 0, "Do busness", "kvsudeshanuradha@gmail.com" },
                    { 4, "blaaaa4", 1, "Go to weding", "kvsudeshanuradha@gmail.com" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
