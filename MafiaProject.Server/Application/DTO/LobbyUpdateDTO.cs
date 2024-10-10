using MafiaProject.Server.Core.Entityes;

namespace MafiaProject.Server.Application.DTO
{
    public class LobbyUpdateDTO
    {
        public int Id { get; set; }
        public int CountOfPlayers { get; set; }
        public bool IsLobbyFull { get; set; }
        public bool IsLobbyActive { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}
