using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using MafiaProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MafiaProject.Infrastructure.Repositories
{
    public class LobbyRepository : Repository<Lobby>, ILobbyRepository
    {
        private readonly ApplicationDbContext _context;

        public LobbyRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task AddPlayerToLobbyAsync(Player player)
        {
            var lobby = await _context.Lobbies
                .Include(l => l.Players)
                .FirstOrDefaultAsync(l => l.Id == player.LobbyId);

            if (lobby != null)
            {
                lobby.Players.Add(player);
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateAsync(Lobby entity)
        {
            await _context.Lobbies.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Player>> GetAllPlayersAsync()
        {
            return await _context.Players.ToListAsync();
        }

        public async Task<KeyValuePair<IEnumerable<Lobby>, int>> GetLobbiesAsync(int pageNumber, int pageSize)
        {
            var totalLobbies = await _context.Lobbies.CountAsync();
            var lobbies = await _context.Lobbies
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new KeyValuePair<IEnumerable<Lobby>, int>(lobbies, totalLobbies);
        }


        public async Task<bool> IsLobbyReadyForGameAsync(int lobbyId)
        {
            var lobby = await _context.Lobbies
               .Include(l => l.Players)
               .FirstOrDefaultAsync(l => l.Id == lobbyId);

            return lobby != null && lobby.Players.Count <= 10; 
        }

        public async Task RemovePlayerFromLobbyAsync(int playerId)
        {
            var player = await _context.Players.FindAsync(playerId);
            if (player != null)
            {
                _context.Players.Remove(player);
                await _context.SaveChangesAsync();
            }
        }
        public async Task UpdateAsync(Lobby entity)
        {
            _context.Lobbies.Update(entity);
            await _context.SaveChangesAsync();

        }
        public async Task<Lobby> GetByIdAsync(int id)
        {
            return await _context.Lobbies.FindAsync(id);
        }
    }
}
