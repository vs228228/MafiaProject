﻿using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using MafiaProject.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Lobbies = new LobbyRepository(_context);
            Games = new GameRepository(_context);
            Players = new PlayerRepository(_context);
            Votes = new VoteRepository(_context);

        }

        public IUserRepository Users { get; set; }
        public ILobbyRepository Lobbies { get; set; }
        public IGameRepository Games { get;set; }
        public IPlayerRepository Players { get; set; }
        public IVoteRepository Votes { get; set; }

        

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
