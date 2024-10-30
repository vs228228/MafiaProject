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

            builder.Property(g => g.Name)
                   .HasMaxLength(100);

            builder.Property(g => g.State)
                   .HasMaxLength(50);

            builder.HasMany(g => g.VoteCandidates)
                   .WithOne()
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(g => g.Votes)
                   .WithOne()
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(g => g.Players)
                   .WithOne()
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}