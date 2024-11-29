using MafiaProject.Core.Entityes;

namespace MafiaProject.Core.Interfaces
{
    public interface ILobbyRepository : IRepository<Lobby>
    {
        public Task<KeyValuePair<IEnumerable<Lobby>, int>> GetLobbiesAsync(int pageNumber, int pageSize); 
        // return array of lobby + all count lobbies

        public Task AddPlayerToLobbyAsync(Player player);
        // public Task RemovePlayerFromLobbyAsync(Player player);
        public Task RemovePlayerFromLobbyAsync(int playerId);
        public Task<IEnumerable<Player>> GetAllPlayersAsync();
        public Task<IEnumerable<Player>> GetAllPlayersAsync(int lobbyId);

        public Task<bool> IsLobbyReadyForGameAsync(int lobbyId);

    }
}
