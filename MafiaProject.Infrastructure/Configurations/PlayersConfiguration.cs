using MafiaProject.Core.Entityes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Configurations
{
    internal class PlayersConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Role).IsRequired().HasMaxLength(25);
            builder.Property(p => p.IsReady).HasDefaultValue(false);
            builder.Property(p => p.IsAlive).HasDefaultValue(true);
            builder.Property(p => p.IsMafia).HasDefaultValue(false);
            builder.Property(p => p.ConnectionId).IsRequired().HasMaxLength(100);
            builder.Property(p => p.IsCameraOn).HasDefaultValue(false);
            builder.Property(p => p.IsMicrophoneOn).HasDefaultValue(false);
            builder.HasOne(p => p.Game).WithMany(g => g.Players).HasForeignKey(p => p.GameId);

        }
    }
}
