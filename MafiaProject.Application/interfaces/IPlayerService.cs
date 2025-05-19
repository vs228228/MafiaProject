using MafiaProject.Application.DTO;
using MafiaProject.Application.Pagination;
using MafiaProject.Core.Entityes;

namespace MafiaProject.Application.interfaces
{
    public interface IPlayerService
    {
        public Task<PlayerDTO> GetPlayerByIdAsync(int userId);
        public Task<IEnumerable<PlayerDTO>> GetAllPlayersAsync(int gameId);
        public Task UpdatePlayerAsync(PlayerUpdateDTO playerUpdateDTO);
        public Task DeletePlayerAsync(int playerId);
        public Task ChangeReadyAsync(ChangeReadyDTO changeReadyDTO);
        public Task ChangeMicroAsync(ChangeMicroDTO changeMicroDTO);
        public Task ChangeVideoAsync(ChangeVideoDTO changeVideoDTO);
        // public Task ChangeLiveAsync(ChangeLiveDTO);  // пересмотреть необходимость в этом методе


    }
}
