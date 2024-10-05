using MafiaProject.Server.Core.Entityes;
using MafiaProject.Server.Core.Pagination;

namespace MafiaProject.Server.Core.Interfaces
{
    public interface ILobbyRepository : IRepository<Lobby>
    {
        public Task<PagedResult<Lobby>> GetLobbiesAsync(int pageNumber, int pageSize);

        public Task AddPlayerToLobbyAsync(Player player);
        public Task RemovePlayerFromLobbyAsync(Player player);
        public Task<IEnumerable<Player>> GetAllPlayersAsync();

        public Task<bool> IsLobbyReadyForGameAsync(int lobbyId);

    }
}
