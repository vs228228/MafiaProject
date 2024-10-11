using MafiaProject.Server.Application.DTO;

namespace MafiaProject.Server.Application.interfaces
{
    public  interface ILobbyService
    {

        public Task<LobbyDTO> GetLobbyByIdAsync(int id);
        public Task<IEnumerable<LobbyDTO>> GetAllLobbiesAsync();
        public Task CreateLobbyAsync(LobbyCreateDTO lobbyCreateDTO);
        public Task UpdateLobbyAsync(LobbyUpdateDTO lobbyUpdateDTO);
        public Task DeleteLobbyAsync(int id);
        public Task StartGameAsync(int lobbyId);
    }
}
