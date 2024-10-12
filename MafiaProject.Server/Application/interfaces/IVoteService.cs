namespace MafiaProject.Server.Application.interfaces
{
    public interface IVoteService
    {
        // реаpublic Task<VoteDTO> GetVoteByIdAsync(int id); реализовать все три
        //public Task<IEnumerable<VoteDTO>> GetVotesByGameIdAsync(int gameId);
        //public Task CreateVoteAsync(VoteCreateDTO voteCreateDTO); тут будет создание воута через playerId того, кто голосует и playerId за кого голосуют
        public Task DeleteVoteAsync(int voteId);
    }
}
