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
    public class LobbyRepository : Repository<Lobby>, ILobbyRepository
    {
        private readonly ApplicationDbContext _context;

        public LobbyRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Task AddPlayerToLobbyAsync(Player player)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(Lobby entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Player>> GetAllPlayersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<KeyValuePair<IEnumerable<Lobby>, int>> GetLobbiesAsync(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsLobbyReadyForGameAsync(int lobbyId)
        {
            throw new NotImplementedException();
        }

        public Task RemovePlayerFromLobbyAsync(int playerId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Lobby entity)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<Lobby>> IRepository<Lobby>.GetAllAsync()
        {
            throw new NotImplementedException();
        }

        Task<Lobby> IRepository<Lobby>.GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
