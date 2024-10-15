using MafiaProject.Core.Entityes;

namespace MafiaProject.Core.Interfaces
{
    public interface ILobbyRepository : IRepository<Lobby>
    {
        public Task<IEnumerable<Lobby>> GetLobbiesAsync(int pageNumber, int pageSize);

        public Task AddPlayerToLobbyAsync(Player player);
        public Task RemovePlayerFromLobbyAsync(Player player);
        public Task<IEnumerable<Player>> GetAllPlayersAsync();

        public Task<bool> IsLobbyReadyForGameAsync(int lobbyId);

    }
}
