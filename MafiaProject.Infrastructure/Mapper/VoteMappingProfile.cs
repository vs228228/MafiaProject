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
    public class VoteMappingProfile : Profile
    {
        public VoteMappingProfile() {
            CreateMap<Vote, VoteDTO>().ReverseMap();
            CreateMap<IEnumerable<Vote>, IEnumerable<VoteDTO>>();
        }
    }
}
