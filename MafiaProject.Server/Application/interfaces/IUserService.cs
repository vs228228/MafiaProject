using MafiaProject.Server.Application.DTO;
using MafiaProject.Server.Application.Pagination;

namespace MafiaProject.Server.Application.interfaces
{
    public interface IUserService
    {
        public Task<UserDTO> GetUserByEmailAsync(string email);
        public Task<UserDTO> GetUserByIdAsync(int id);
        public Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        public Task<PagedResult<UserDTO>> GetPaginatedUsersAsync(int pageNumber, int pageSize);
        // public Task<StatisticDTO> GetStatisticForUserAsync(int userId); реализовать

        public Task TryAddUserAsync(UserCreateDTO userCreateDTO);
        public Task UpdateUserAsync(UserUpdateDto userUpdateDTO, IFormFile photo);
        public Task DeleteUserAsync(int id);

        public Task<TokenDTO> TryAuthUserAsync(AuthDTO authDTO);
        
       public Task<string> RefreshTokenAsync(RefreshTokenDTO refreshTokenDTO); 
        
       



    }
}
