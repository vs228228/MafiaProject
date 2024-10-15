using MafiaProject.Application.DTO;
using MafiaProject.Application.Pagination;
using MafiaProject.Core.Entityes;

namespace MafiaProject.Application.interfaces
{
    public interface IPlayerService
    {
        public Task<PlayerDTO> GetPlayerByUserIdAsync(int userId);
        public Task<IEnumerable<PlayerDTO>> GetAllPlayersAsync(int gameId);
        public Task<PagedResult<PlayerDTO>> GetPaginatedPlayersAsync(int pageNumber, int pageSize);
        public Task<PlayerDTO> ConvertUserToPlayerAsync(User user, int connectionId); // в теории может быть нужно убрать connectionId
        public Task UpdatePlayerAsync(PlayerUpdateDTO playerUpdateDTO);
        public Task RemovePlayerAsync(int playerId);
        public Task ChangeReadyAsync(ChangeReadyDTO changeReadyDTO);
        public Task ChangeMicroAsync(ChangeMicroDTO changeMicroDTO);
        public Task ChangeVideoAsync(ChangeVideoDTO changeVideoDTO);
        // public Task ChangeLiveAsync(ChangeLiveDTO);  // пересмотреть необходимость в этом методе


    }
}
