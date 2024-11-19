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

        public async Task AddVoteAsync(int gameId, Vote vote)
        {
            var game = await _context.Games.Include(g => g.Votes).FirstOrDefaultAsync(g => g.Id == gameId);
            if (game == null)
                throw new KeyNotFoundException("Game not found.");

            game.Votes.Add(vote);
            await _context.SaveChangesAsync();
        }

        public async Task CreateAsync(Game entity)
        {
            await _context.Games.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task EndGameAsync(int gameId)
        {
            var game = await _context.Games.FindAsync(gameId);
            if (game == null)
                throw new KeyNotFoundException("Game not found.");

            game.IsGameEnded = true;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Player>> GetAlivePlayersCountAsync(int gameId)
        {
            var players = await _context.Players
                .Where(p => p.GameId == gameId && p.IsAlive)
                .ToListAsync();

            return players;
        }

        public async Task<IEnumerable<Vote>> GetAllVotesAsync(int gameId)
        {
            var votes = await _context.Votes
                .Where(v => v.GameId == gameId)
                .ToListAsync();

            return votes;

            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Game entity)
        {
            _context.Games.Update(entity);
            await _context.SaveChangesAsync();
        }




    }
}
