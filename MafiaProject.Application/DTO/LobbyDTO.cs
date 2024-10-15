using MafiaProject.Core.Entityes;

namespace MafiaProject.Application.DTO
{
    public class LobbyDTO
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Name { get; set; }
        public int CountOfPlayers { get; set; }
        public bool IsLobbyFull { get; set; }
        public bool IsLobbyActive { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}
