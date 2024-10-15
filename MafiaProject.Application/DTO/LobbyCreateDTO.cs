namespace MafiaProject.Application.DTO
{
    public class LobbyCreateDTO
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Name { get; set; }
        public string? Password { get; set; }
    }
}
