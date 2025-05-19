﻿using MafiaProject.Application.DTO;
using MafiaProject.Application.Pagination;

namespace MafiaProject.Application.interfaces
{
    public interface ILobbyService
    {

        public Task<LobbyDTO> GetLobbyByIdAsync(int id);
        public Task<IEnumerable<LobbyDTO>> GetAllLobbiesAsync();
        public Task<PagedResult<LobbyDTO>> GetPaginatedLobiesAsync(int pageNumber, int pageSize);
        public Task CreateLobbyAsync(LobbyCreateDTO lobbyCreateDTO);
        public Task UpdateLobbyAsync(LobbyUpdateDTO lobbyUpdateDTO);
        public Task DeleteLobbyAsync(int id);
        public Task StartGameAsync(int lobbyId);
        public Task<IEnumerable<PlayerDTO>> GetAllPlayersAsync(int lobbyId);
        public Task<int> ConnectToLobbyAsync(int lobbyId, int userId, string password);
        public Task DisconnectToLobbyAsync(int lobbyId, int playerId);
    }
}
