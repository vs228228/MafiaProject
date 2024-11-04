﻿using MafiaProject.Application.DTO;
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

        public UserService(/*IUnitOfWork unitOfWork,*/ IMapperClass mapper)
        {
            //  _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = new PhotoService();
        }

        public async Task DeleteUserAsync(int id)
        {
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
             throw new NotImplementedException();
        }

        public async Task TryAddUserAsync(UserCreateDTO userCreateDTO)
        {
            var ans = await _mapper.Map<UserCreateDTO, User>(userCreateDTO);
            await _unitOfWork.Users.CreateAsync(ans); // needed to check
            await _unitOfWork.SaveChangesAsync();
        }

        public Task<TokenDTO> TryAuthUserAsync(AuthDTO authDTO)
        {
            //string email = authDTO.Email;
            //var ans = _unitOfWork.Users.GetUserByEmailAsync(email);
            //and then we should compare our passwords, and if they are the same, return TokenDTO
            throw new NotImplementedException();
        }

        public async Task UpdateUserAsync(UserUpdateDto userUpdateDTO, IFormFile photo)
        {
            User user = new User();
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
