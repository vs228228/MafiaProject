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
    public class VoteRepository : Repository<Vote>, IVoteRepository
    {
        private readonly ApplicationDbContext _context;

        public VoteRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task CreateAsync(Vote entity)
        {
            await _context.Votes.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            if (vote != null)
            {
                _context.Votes.Remove(vote);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(Vote entity)
        {
            _context.Votes.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<Vote> GetByIdAsync(int id)
        {
            return await _context.Votes.FindAsync(id);
        }

        public async Task<IEnumerable<Vote>> GetAllAsync()
        {
            return await _context.Votes.ToListAsync();
        }
    }

}
