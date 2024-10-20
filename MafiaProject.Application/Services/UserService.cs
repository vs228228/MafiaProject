using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.Pagination;
using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapperClass _mapper;

        public UserService(IUnitOfWork unitOfWork, IMapperClass mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public Task DeleteUserAsync(int id)
        {
            _unitOfWork.Users.DeleteAsync(id);
            throw new NotImplementedException(); // not ready
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var ans = await _unitOfWork.Users.GetAllAsync();
            return await _mapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(ans);
        }

        public Task<PagedResult<UserDTO>> GetPaginatedUsersAsync(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> GetUserByEmailAsync(string email)
        {

            var ans = await _unitOfWork.Users.GetUserByEmailAsync(email);
            return await _mapper.Map<User, UserDTO>(ans);

        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var ans = await _unitOfWork.Users.GetByIdAsync(id);
            return await _mapper.Map<User, UserDTO>(ans);
        }

        public Task<string> RefreshTokenAsync(RefreshTokenDTO refreshTokenDTO)
        {
            throw new NotImplementedException();
        }

        public Task TryAddUserAsync(UserCreateDTO userCreateDTO)
        {
            throw new NotImplementedException();
        }

        public Task<TokenDTO> TryAuthUserAsync(AuthDTO authDTO)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserAsync(UserUpdateDto userUpdateDTO, IFormFile photo)
        {
            throw new NotImplementedException();
        }
    }
}
