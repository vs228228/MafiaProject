using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.Pagination;
using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.Marshalling;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapperClass _mapper;

        public PlayerService(/*IUnitOfWork unitOfWork,*/ IMapperClass mapper)
        {
            //  _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task ChangeMicroAsync(ChangeMicroDTO changeMicroDTO)
        {
            var playerId = changeMicroDTO.Id;
            var ans = await _unitOfWork.Player.GetByIdAsync(playerId);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            ans.IsMicrophoneOn = !changeMicroDTO.IsMicrophoneOn;
            await _unitOfWork.Player.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ChangeReadyAsync(ChangeReadyDTO changeReadyDTO)
        {
            var playerId = changeReadyDTO.Id;
            var ans = await _unitOfWork.Player.GetByIdAsync(playerId);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            ans.IsReady = !changeReadyDTO.IsReady;
            await _unitOfWork.Player.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ChangeVideoAsync(ChangeVideoDTO changeVideoDTO)
        {
            var playerId = changeVideoDTO.Id;
            var ans = await _unitOfWork.Player.GetByIdAsync(playerId);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            ans.IsCameraOn = !changeVideoDTO.IsCameraOn;
            await _unitOfWork.Player.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<PlayerDTO>> GetAllPlayersAsync(int gameId)
        {
            var ans = await _unitOfWork.Player.GetAllAsync();
            return await _mapper.Map<IEnumerable<Player>, IEnumerable<PlayerDTO>>(ans);
        }

        public async Task<PlayerDTO> GetPlayerByIdAsync(int playerId)
        {
            var ans = await _unitOfWork.Player.GetByIdAsync(playerId);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            return await _mapper.Map<Player, PlayerDTO>(ans);
        }

        public async Task DeletePlayerAsync(int playerId)
        {
            await _unitOfWork.Player.DeleteAsync(playerId);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdatePlayerAsync(PlayerUpdateDTO playerUpdateDTO)
        {
            var playerId = playerUpdateDTO.Id;
            var ans = await _unitOfWork.Player.GetByIdAsync(playerId);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            ans.IsAlive = !playerUpdateDTO.IsAlive;
            await _unitOfWork.Player.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
