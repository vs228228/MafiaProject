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

       


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Server = 213.109.204.190; Port = 5432; Database = MafiaDataBase; User Id = gen_user; Password = MAFIA123;",b => b.MigrationsAssembly("MafiaProject.Infrastructure"));
        }
    }
}
