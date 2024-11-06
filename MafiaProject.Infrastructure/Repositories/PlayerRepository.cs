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
    public class PlayerRepository : Repository<Player>, IPlayerRepository
    {
        private readonly ApplicationDbContext _context;
        public PlayerRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
