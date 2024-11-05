using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace MafiaProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            var user =  await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpGet("getByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email)
        {
            var user =  await _userService.GetUserByEmailAsync(email);
            return Ok(user);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users =  await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> TryAddUserAsync(UserCreateDTO user)
        {
            await _userService.TryAddUserAsync(user);
            return Created();
        }

        [HttpPost("TryAuth")]
        public async Task<IActionResult> TryAuthUserAsync(AuthDTO authDTO)
        {
            var tokens =  await _userService.TryAuthUserAsync(authDTO);
            return Ok(tokens);
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshTokenAsync(RefreshTokenDTO refreshToken)
        {
            var token =  await _userService.RefreshTokenAsync(refreshToken);
            return Ok(token);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromForm] UserUpdateDto userUpdate, IFormFile photo = null)
        {
            await _userService.UpdateUserAsync(userUpdate, photo);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
