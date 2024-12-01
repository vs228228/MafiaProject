using AutoMapper;
using MafiaProject.Application.DTO;
using MafiaProject.Core.Entityes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MafiaProject.Infrastructure.Mapper
{
    public class GameMappingProfile : Profile
    {
        public GameMappingProfile() {
            CreateMap<CreateGameDTO, Game>();
            CreateMap<Game, GameDTO>();
            CreateMap<MafiaDTO, Vote>();
        }
    }
}
