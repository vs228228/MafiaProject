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
    public class LobbyMappingProfile : Profile
    {
        public LobbyMappingProfile() {
            CreateMap<Lobby, LobbyDTO>().ReverseMap();
            CreateMap<IEnumerable<Lobby>, IEnumerable<LobbyDTO>>();
            CreateMap<LobbyCreateDTO, Lobby>();
            CreateMap<LobbyUpdateDTO, Lobby>();
        }
    }
}
