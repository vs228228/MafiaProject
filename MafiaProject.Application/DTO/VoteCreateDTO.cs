namespace MafiaProject.Application.DTO
{
    public class VoteCreateDTO
    {
        public int GameId { get; set; }
        public int VoterId { get; set; }
        public int PlayerToKickId { get; set; }
    }
}
