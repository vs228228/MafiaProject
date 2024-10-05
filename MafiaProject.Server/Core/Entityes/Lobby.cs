namespace MafiaProject.Server.Core.Entityes
{
    public class Lobby
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Name { get; set; }
        public string? Password { get; set; }

        public int CountOfPlayers { get; set; }
        public bool IsLobbyFull { get; set; }
        public bool IsLobbyActive { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}
