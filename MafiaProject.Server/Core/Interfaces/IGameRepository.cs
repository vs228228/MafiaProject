using MafiaProject.Server.Core.Entityes;

namespace MafiaProject.Server.Core.Interfaces
{
    public interface IGameRepository : IRepository<Game>
    {
        public Task AddVoteAsync(int gameId, Vote vote);
        public Task<IEnumerable<Vote>> GetAllVotesAsync();

        public Task<IEnumerable<Player>> GetAlivePlayersCountAsync(int gameId);
        public Task EndGameAsync(int gameId);
    }
}
