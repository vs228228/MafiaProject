using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace MafiaProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LobbyController : ControllerBase
    {
        private ILobbyService _lobbyService;

        public LobbyController(ILobbyService lobbyService)
        {
            _lobbyService = lobbyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPaginatedLobiesAsync(int pageNumber, int pageSize)
        {
            var ans = await _lobbyService.GetPaginatedLobiesAsync(pageNumber, pageSize);
            return Ok(ans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLobbyByIdAsync(int id)
        {
            var ans = await _lobbyService.GetLobbyByIdAsync(id);
            return Ok(ans);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllLobbiesAsync()
        {
            var ans = await _lobbyService.GetAllLobbiesAsync();
            return Ok(ans);
        }

        [HttpGet("getAllPlayers")]
        public async Task<IActionResult> GetAllPlayersAsync(int lobbyId)
        {
            var ans = await _lobbyService.GetAllPlayersAsync(lobbyId);
            return Ok(ans);
        }


        [HttpPost]
        public async Task<IActionResult> CreateLobbyAsync(LobbyCreateDTO lobbyCreateDTO)
        {
            await _lobbyService.CreateLobbyAsync(lobbyCreateDTO);
            return Created();
        }

        [HttpPost("{startGame}")]
        public async Task<IActionResult> StartGameAsync(int lobbyId) // возможно не нужен http запрос т.к. в теории сервер должен начинать игру вне зависимости от желания юзеров
        {
            await _lobbyService.StartGameAsync(lobbyId);
            return Ok();
        }



        [HttpPost("connectToLobby")]
        public async Task<IActionResult> ConnectToLobbyAsync(int lobbyId, int userId, string password)
        {
            await _lobbyService.ConnectToLobbyAsync(lobbyId, userId, password);
            return Ok();
        }

        [HttpPost("disconnectToLobby")]
        public async Task<IActionResult> DisconnectToLobbyAsync(int lobbyId, int playerId)
        {
            await _lobbyService.DisconnectToLobbyAsync(lobbyId, playerId);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateLobbyAsync(LobbyUpdateDTO lobbyUpdateDTO)
        {
            await _lobbyService.UpdateLobbyAsync(lobbyUpdateDTO);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLobbyAsync(int id)
        {
            await _lobbyService.DeleteLobbyAsync(id);
            return NoContent();
        }
    }
}
