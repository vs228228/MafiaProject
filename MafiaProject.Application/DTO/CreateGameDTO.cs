using MafiaProject.Core.Entityes;

namespace MafiaProject.Application.DTO
{
    public class CreateGameDTO
    {
        public string Name { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
