using AutoMapper;
using MafiaProject.Application.DTO;
using MafiaProject.Core.Entityes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Mapper
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile() { 
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserCreateDTO, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<User, StatisticDTO>();
            CreateMap<AuthDTO, User>();
        }
    }
}
