using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MafiaProject.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Lobbys_LobbyId",
                table: "Players");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lobbys",
                table: "Lobbys");

            migrationBuilder.RenameTable(
                name: "Lobbys",
                newName: "Lobbies");

            migrationBuilder.AlterColumn<int>(
                name: "LobbyId",
                table: "Players",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lobbies",
                table: "Lobbies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Lobbies_LobbyId",
                table: "Players",
                column: "LobbyId",
                principalTable: "Lobbies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Lobbies_LobbyId",
                table: "Players");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lobbies",
                table: "Lobbies");

            migrationBuilder.RenameTable(
                name: "Lobbies",
                newName: "Lobbys");

            migrationBuilder.AlterColumn<int>(
                name: "LobbyId",
                table: "Players",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lobbys",
                table: "Lobbys",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Lobbys_LobbyId",
                table: "Players",
                column: "LobbyId",
                principalTable: "Lobbys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
