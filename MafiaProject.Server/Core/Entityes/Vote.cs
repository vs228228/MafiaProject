namespace MafiaProject.Server.Core.Entityes
{
    public class Vote
    {
        public int VoteId { get; set; }
        public int VoterId { get; set; }
        public int PlayerToKickId { get; set; }
    }
}
