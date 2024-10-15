using MafiaProject.Server.Core.Entityes;

namespace MafiaProject.Server.Application.DTO
{
    public class CreateGameDTO
    {
        public string Name { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
