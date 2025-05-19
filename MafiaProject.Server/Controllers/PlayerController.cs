using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MafiaProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        IPlayerService _playerService;

        public PlayerController(IPlayerService playerService) 
        { 
            _playerService = playerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlayerByIdAsync(int playerId)
        {
            var ans = await _playerService.GetPlayerByIdAsync(playerId);
            return Ok(ans);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllPlayersAsync(int gameId)
        {
            var ans = await _playerService.GetAllPlayersAsync(gameId);
            return Ok(ans);
        }

        [HttpPost("changeMicro")]
        public async Task<IActionResult> ChangeMicroAsync(ChangeMicroDTO changeMicroDTO)
        {
            await _playerService.ChangeMicroAsync(changeMicroDTO);
            return Ok();
        }

        [HttpPost("changeReady")]
        public async Task<IActionResult> ChangeReadyAsync(ChangeReadyDTO changeReadyDTO)
        {
            await _playerService.ChangeReadyAsync(changeReadyDTO);
            return Ok();
        }

        [HttpPost("changeCamera")]
        public async Task<IActionResult> ChangeVideoAsync(ChangeVideoDTO changeVideoDTO)
        {
            await _playerService.ChangeVideoAsync(changeVideoDTO);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePlayerAsync(PlayerUpdateDTO playerUpdateDTO)
        {
            await _playerService.UpdatePlayerAsync(playerUpdateDTO);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePlayerAsync(int playerId)
        {
            await _playerService.DeletePlayerAsync(playerId);
            return NoContent();
        }
    }
}
