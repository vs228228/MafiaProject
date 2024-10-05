using MafiaProject.Server.Core.Entityes;

namespace MafiaProject.Server.Application.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Nick { get; set; }
        public string Email { get; set; }
        public string pathToPic { get; set; }
        public int CountOfGame { get; set; }
        public int Victories { get; set; }
    }
}
