using MafiaProject.Application.DTO;

namespace MafiaProject.Application.interfaces
{
    public interface IVoteService
    {
        public Task<VoteDTO> GetVoteByIdAsync(int id);// реализовать все три
        public Task<IEnumerable<VoteDTO>> GetVotesByGameIdAsync(int gameId);
        public Task CreateVoteAsync(VoteCreateDTO voteCreateDTO); //тут будет создание воута через playerId того, кто голосует и playerId за кого голосуют
        public Task DeleteVoteAsync(int voteId);
    }
}
