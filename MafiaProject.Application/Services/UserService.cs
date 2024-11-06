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
        private readonly PhotoService _photoService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenManager _tokenManager;

        public UserService(IUnitOfWork unitOfWork, IMapperClass mapper, IPasswordHasher passwordHasher)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = new PhotoService();
            _passwordHasher = passwordHasher;
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user == null) throw new KeyNotFoundException();
            await _unitOfWork.Users.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var ans = await _unitOfWork.Users.GetAllAsync();
            return await _mapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(ans);
        }

        public async Task<StatisticDTO> GetStatisticForUserAsync(int userId)
        {
            var ans = await _unitOfWork.Users.GetByIdAsync(userId);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            return await _mapper.Map<User, StatisticDTO>(ans);
        }

        public async Task<UserDTO> GetUserByEmailAsync(string email)
        {
            var ans = await _unitOfWork.Users.GetUserByEmailAsync(email);
            if(ans == null)
            {
                throw new KeyNotFoundException();
            }
            return await _mapper.Map<User, UserDTO>(ans);
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var ans = await _unitOfWork.Users.GetByIdAsync(id);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            return await _mapper.Map<User, UserDTO>(ans);
        }

        public async Task<string> RefreshTokenAsync(RefreshTokenDTO refreshTokenDTO)
        {
            var userid = refreshTokenDTO.UserId;
            var user = await _unitOfWork.Users.GetByIdAsync(userid);
            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            if (refreshTokenDTO.RefreshToken == user.RefreshToken && user.Expiration < DateTime.Now)
            {
                return _tokenManager.GenerateAccessToken(user);
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task TryAddUserAsync(UserCreateDTO userCreateDTO)
        {
            var ans = await _mapper.Map<UserCreateDTO, User>(userCreateDTO);
            ans.pathToPic = "/images/default.jpg";
            ans.RefreshToken = "";
            var email = ans.Email;
            var user = await _unitOfWork.Users.GetUserByEmailAsync(email);
            if (user == null) // Need to check is user exist
            {
                ans.Password = await _passwordHasher.HashPassword(ans.Password);
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
            await _unitOfWork.Users.CreateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<TokenDTO> TryAuthUserAsync(AuthDTO authDTO)
        {
            string email = authDTO.Email;
            var user = await _unitOfWork.Users.GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new KeyNotFoundException();
            }
            bool compare = await _passwordHasher.VerifyPassword(user.Password, authDTO.Password);
            if (compare)
            {
                var RefreshToken = _tokenManager.GenerateRefreshToken();
                TokenDTO tokenDTO = new TokenDTO();
                tokenDTO.RefreshToken = RefreshToken.Token;

                string AccessToken = _tokenManager.GenerateAccessToken(user);
                tokenDTO.AccessToken = AccessToken;

                user.Expiration = RefreshToken.Expiration;
                user.RefreshToken = RefreshToken.Token;

                await _unitOfWork.Users.UpdateAsync(user);
                await _unitOfWork.SaveChangesAsync();

                return tokenDTO;
            }
            else
            {
                throw new UnauthorizedAccessException();
            }

        }

        public async Task UpdateUserAsync(UserUpdateDto userUpdateDTO, IFormFile photo)
        {
            User user = await _unitOfWork.Users.GetByIdAsync(userUpdateDTO.Id);
            var ans = await _mapper.Update<UserUpdateDto, User>(userUpdateDTO, user);
            string id = user.Id.ToString();
            if (photo != null)
            {
                string path = await _photoService.SaveUserProfilePhotoAsync(photo, id);
                ans.pathToPic = path;
            }
            await _unitOfWork.Users.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
