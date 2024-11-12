using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class VoteService : IVoteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapperClass _mapper;

        public VoteService(IUnitOfWork unitOfWork, IMapperClass mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task CreateVoteAsync(VoteCreateDTO voteCreateDTO)
        {
            var ans = await _mapper.Map<VoteCreateDTO, Vote>(voteCreateDTO);
            await _unitOfWork.Votes.CreateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteVoteAsync(int voteId)
        {
            await _unitOfWork.Votes.DeleteAsync(voteId);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<VoteDTO> GetVoteByIdAsync(int id)
        {
            var ans = await _unitOfWork.Votes.GetByIdAsync(id);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            return await _mapper.Map<Vote, VoteDTO>(ans);
        }

        public async Task<IEnumerable<VoteDTO>> GetVotesByGameIdAsync(int gameId)
        {
            var game = await _unitOfWork.Games.GetAllVotesAsync(gameId);
            return await _mapper.Map<IEnumerable<Vote>, IEnumerable<VoteDTO>>(game);
        }
    }
}
