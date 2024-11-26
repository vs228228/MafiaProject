using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MafiaProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {

        private readonly IGameService _gameService;
        public GameController(IGameService gameService) { 
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGameByIdAsync(int id)
        {
            var ans = await _gameService.GetGameByIdAsync(id);
            return Ok(ans);
        }

        [HttpGet("PoliceCheck")]
        public async Task<IActionResult> PoliceCheckAsync(PoliceDTO policeDTO)
        {
            var ans = await _gameService.PoliceCheckAsync(policeDTO);
            return Ok(ans);
        }

        [HttpGet("ChangeGamePhase")]
        public async Task<IActionResult> ChangeGamePhaseAsync(int gameId, string phase) // может быть нужно убрать его будет т.к. это в теории делает сервер
        {
            await _gameService.ChangeGamePhaseAsync(gameId, phase);
            return Ok();
        }

        [HttpGet("GetAlivePlayers")]
        public async Task<IActionResult> GetAlivePlayersAsync(int gameId)
        {
            var ans = await _gameService.GetAlivePlayersAsync(gameId);
            return Ok(ans);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGameAsync(CreateGameDTO createGameDTO)
        {
            await _gameService.CreateGameAsync(createGameDTO);
            return Ok();
        }

        [HttpPost("DoctorHeal")]
        public async Task<IActionResult> DoctorHealAsync(DoctorDTO doctorDTO)
        {
            await _gameService.DoctorHealAsync(doctorDTO);
            return Ok();
        }

        [HttpPost("MafiaShoot")]
        public async Task<IActionResult> MafiaShootAsync(MafiaDTO mafiaVote)
        {
            await _gameService.MafiaShootAsync(mafiaVote);
            return Ok();
        }

        [HttpPost("NextPlayerTalk")]
        public async Task<IActionResult> NextPlayerTalk(PlayerTalkDTO playerTalkDTO) // как будто бы это будет через сигналы сделано. Но посмотрим, может и нет
        {
            await _gameService.NextPlayerTalk(playerTalkDTO);
            return Ok();
        }

        [HttpPost("NotifyPlayers")] 
        public async Task<IActionResult> NotifyPlayersAsync(int gameId, string message) // возможно нужно будет убрать с контроллера
        {
            await _gameService.NotifyPlayersAsync(gameId, message);
            return Ok();
        }

       

        [HttpPost("ProcessDayAction")]
        public async Task<IActionResult> ProcessDayAction(int gameId) // скорее всего это будет делать сервер и нужно будет убрать это
        {
            await _gameService.ProcessDayAction(gameId);
            return Ok();
        }

        [HttpPost("ProcessNightAction")]
        public async Task<IActionResult> ProcessNightAction(int gameId) // скорее всего это будет делать сервер и нужно будет убрать это
        {
            await _gameService.ProcessNightAction(gameId);
            return Ok();
        }

        [HttpPost("StartGame")]
        public async Task<IActionResult> StartGame(int gameId)
        {
            await _gameService.StartGame(gameId);
            return Ok();
        }

        [HttpPost("StartNextRound")]
        public async Task<IActionResult> StartNextRound(int gameId) // скорее всего это будет делать сервер и нужно будет убрать это
        {
            await _gameService.StartNextRound(gameId);
            return Ok();
        }

        [HttpPost("AssignRoles")]
        public async Task<IActionResult> AssignRolesAsync(int gameId) // скорее всего это будет делать сервер и нужно будет убрать это
        {
            await _gameService.AssignRolesAsync(gameId);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGameAsync(UpdateGameDTO updateGameDTO)
        {
            await _gameService.UpdateGameAsync(updateGameDTO);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteGameAsync(int gameId)
        {
            await _gameService.DeleteGameAsync(gameId);
            return NoContent();
        }
    }
}
