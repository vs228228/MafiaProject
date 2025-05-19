using MafiaProject.Core.Entityes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Configurations
{
    internal class LobbyConfiguration : IEntityTypeConfiguration<Lobby>
    {
        public void Configure(EntityTypeBuilder<Lobby> builder)
        {
            builder.HasKey(l => l.Id);
            builder.Property(l => l.Name).IsRequired().HasMaxLength(100);
            builder.Property(l => l.Password).HasMaxLength(50);
            builder.Property(l => l.IsLobbyFull).HasDefaultValue(false);
            builder.Property(l => l.IsLobbyActive).HasDefaultValue(true);
            builder.HasMany(l => l.Players).WithOne().OnDelete(DeleteBehavior.Cascade);
        }

    }
}
