using MafiaProject.Server.Core.Entityes;
using Microsoft.EntityFrameworkCore;

namespace MafiaProject.Server.DataBase
{
    public class DataBaseWork : DbContext
    {
        public  DbSet<Game> Games { get; set; }

        public DbSet<Lobby> Lobbies { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<User> Users { get; set; }
        
        public DbSet<Vote> Votes { get; set; }

    }
}
