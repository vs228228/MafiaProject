using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MafiaProject.Infrastructure.Migrations
{
    /// <inheritdoc />
<<<<<<<< HEAD:MafiaProject.Infrastructure/Migrations/20241105122420_init.cs
    public partial class init : Migration
========
    public partial class test : Migration
>>>>>>>> abba4fa887983d2b6c032e08b2220aceac05f06a:MafiaProject.Infrastructure/Migrations/20241104235128_test.cs
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    State = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CountOfAlive = table.Column<int>(type: "integer", nullable: false, defaultValue: 10),
                    CountOfMafia = table.Column<int>(type: "integer", nullable: false, defaultValue: 3),
                    IsGameEnded = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RoundNumber = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    WhoLastHealed = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lobbys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CountOfPlayers = table.Column<int>(type: "integer", nullable: false),
                    IsLobbyFull = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsLobbyActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lobbys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Token = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Expiration = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Token);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nick = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    pathToPic = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CountOfGame = table.Column<int>(type: "integer", nullable: false),
                    Victories = table.Column<int>(type: "integer", nullable: false),
                    RefreshToken = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Expiration = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    isPlayer = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    VoteId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VoterId = table.Column<int>(type: "integer", nullable: false),
                    PlayerToKickId = table.Column<int>(type: "integer", nullable: false),
                    GameId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.VoteId);
                    table.ForeignKey(
                        name: "FK_Votes_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Position = table.Column<int>(type: "integer", nullable: false),
                    Role = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: false),
                    IsReady = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsAlive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsMafia = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    ConnectionId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IsCameraOn = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsMicrophoneOn = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    GameId = table.Column<int>(type: "integer", nullable: false),
                    GameId1 = table.Column<int>(type: "integer", nullable: true),
                    LobbyId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Players_Games_GameId1",
                        column: x => x.GameId1,
                        principalTable: "Games",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Players_Lobbys_LobbyId",
                        column: x => x.LobbyId,
                        principalTable: "Lobbys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Players_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_GameId",
                table: "Players",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_GameId1",
                table: "Players",
                column: "GameId1");

            migrationBuilder.CreateIndex(
                name: "IX_Players_LobbyId",
                table: "Players",
                column: "LobbyId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_UserId",
                table: "Players",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Votes_GameId",
                table: "Votes",
                column: "GameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "Lobbys");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
