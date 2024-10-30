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
    public class PlayerMappingProfile : Profile
    {
        public PlayerMappingProfile() {
            CreateMap<Player, PlayerDTO>().ReverseMap();
            CreateMap<IEnumerable<Player>, IEnumerable<PlayerDTO>>();
        }
    }
}
