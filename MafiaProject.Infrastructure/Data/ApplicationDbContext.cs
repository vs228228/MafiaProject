using MafiaProject.Core.Entityes;
using MafiaProject.Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;



namespace MafiaProject.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions <ApplicationDbContext> options): base(options) { }
        public DbSet<Game> Games { get; set; }
        public DbSet<Lobby> Lobbys { get; set;}
        public DbSet<Player> Players { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new GameConfiguration());
            modelBuilder.ApplyConfiguration(new LobbyConfiguration());
            modelBuilder.ApplyConfiguration(new PlayersConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new VoteConfiguration());
        }



    }
}
