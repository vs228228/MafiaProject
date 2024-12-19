using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.Pagination;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Mvc;

namespace MafiaProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        private ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            _logger.LogInformation("Fetching user by ID: {Id}", id);
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                _logger.LogWarning("User with ID {Id} not found", id);
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("getByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email)
        {
            _logger.LogInformation("Fetching user by email: {Email}", email);
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                _logger.LogWarning("User with email {Email} not found", email);
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                _logger.LogInformation("Fetching all users\n\n");
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all users\n\n");
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> TryAddUserAsync(UserCreateDTO user)
        {
            _logger.LogInformation("Attempting to add a new user");
            await _userService.TryAddUserAsync(user);
            _logger.LogInformation("User added successfully");
            return Created();
        }

        [HttpPost("TryAuth")]
        public async Task<IActionResult> TryAuthUserAsync(AuthDTO authDTO)
        {
            _logger.LogInformation("Attempting to authenticate user");
            var tokens = await _userService.TryAuthUserAsync(authDTO);

            _logger.LogInformation("Authentication successful, setting cookies");
            Response.Cookies.Append("access_token", tokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(30)
            });

            Response.Cookies.Append("refresh_token", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(tokens);
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshTokenAsync(RefreshTokenDTO refreshToken)
        {
            _logger.LogInformation("Refreshing access token");
            var token = await _userService.RefreshTokenAsync(refreshToken);

            _logger.LogInformation("Token refreshed successfully, setting new access token cookie");
            Response.Cookies.Append("access_token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(30)
            });

            return Ok(token);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromForm] UserUpdateDto userUpdate, IFormFile photo = null)
        {
            _logger.LogInformation("Updating user: {UserId}", userUpdate.Id);
            await _userService.UpdateUserAsync(userUpdate, photo);
            _logger.LogInformation("User updated successfully");
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            _logger.LogInformation("Deleting user with ID: {Id}", id);
            await _userService.DeleteUserAsync(id);
            _logger.LogInformation("User with ID {Id} deleted successfully", id);
            return NoContent();
        }
    }
}
