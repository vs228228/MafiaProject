﻿using MafiaProject.Server.Application.DTO;
using MafiaProject.Server.Core.Entityes;

namespace MafiaProject.Server.Application.interfaces
{
    public interface IPlayerService
    {
        Task<PlayerDTO> GetPlayerByUserIdAsync(int userId);
        Task<IEnumerable<PlayerDTO>> GetAllPlayersAsync(int gameId);
        Task<PlayerDTO> ConvertUserToPlayerAsync(User user, int connectionId); // в теории может быть нужно убрать connectionId
        Task UpdatePlayerAsync(PlayerUpdateDTO playerUpdateDTO);
        Task RemovePlayerAsync(int playerId);
        Task ChangeReadyAsync(ChangeReadyDTO changeReadyDTO);
        Task ChangeMicroAsync(ChangeMicroDTO changeMicroDTO);
        Task ChangeVideoAsync(ChangeVideoDTO changeVideoDTO);
       // Task ChangeLiveAsync(ChangeLiveDTO);  // пересмотреть необходимость в этом методе

        
    }
}
