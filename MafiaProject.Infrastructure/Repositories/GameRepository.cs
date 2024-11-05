using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using MafiaProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Repositories
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        public readonly ApplicationDbContext _context;
        public GameRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }




        public Task AddVoteAsync(int gameId, Vote vote)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(Game entity)
        {
            throw new NotImplementedException();
        }

        public Task EndGameAsync(int gameId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Player>> GetAlivePlayersCountAsync(int gameId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Vote>> GetAllVotesAsync(int gameId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Game entity)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<Game>> IRepository<Game>.GetAllAsync()
        {
            throw new NotImplementedException();
        }

        Task<Game> IRepository<Game>.GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
