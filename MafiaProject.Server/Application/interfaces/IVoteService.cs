namespace MafiaProject.Server.Application.interfaces
{
    public interface IVoteService
    {
        //public Task<VoteDTO> GetVoteByIdAsync(int id);
        //public Task<IEnumerable<VoteDTO>> GetVotesByGameIdAsync(int gameId);
        //public Task CastVoteAsync(VoteCreateDTO voteCreateDTO);
        public Task DeleteVoteAsync(int voterId, int playerToKickId);
    }
}
