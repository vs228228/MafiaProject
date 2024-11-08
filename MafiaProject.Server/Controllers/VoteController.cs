using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MafiaProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoteController : ControllerBase
    {

        IVoteService _voteService;

        public VoteController(IVoteService voteService)
        { 
            _voteService = voteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetVoteByIdAsync(int id)
        {
            var ans = await _voteService.GetVoteByIdAsync(id);
            return Ok(ans);
        }

        [HttpGet("getAllByGame")]
        public async Task<IActionResult> GetVotesByGameIdAsync(int gameId)
        {
            var ans = await _voteService.GetVotesByGameIdAsync(gameId);
            return Ok(ans);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVoteAsync(VoteCreateDTO voteCreateDTO)
        {
            await _voteService.CreateVoteAsync(voteCreateDTO);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteVoteAsync(int voteId)
        {
            await _voteService.DeleteVoteAsync(voteId);
            return NoContent();
        }
    }
}
