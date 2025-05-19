using MafiaProject.Core.Entityes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MafiaProject.Infrastructure.Configurations
{
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.HasKey(g => g.Id);
            builder.Property(g => g.Name).IsRequired().HasMaxLength(100);
            builder.Property(g => g.State).IsRequired().HasMaxLength(50);
            builder.Property(g => g.CountOfAlive).HasDefaultValue(10);
            builder.Property(g => g.CountOfMafia).HasDefaultValue(3);
            builder.Property(g => g.IsGameEnded).HasDefaultValue(false);
            builder.Property(g => g.RoundNumber).HasDefaultValue(0);
            builder.HasMany(g => g.VoteCandidates).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(g => g.Votes).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(g => g.Players).WithOne(p => p.Game).HasForeignKey(p => p.GameId).OnDelete(DeleteBehavior.Cascade);
        }
    }
 }
