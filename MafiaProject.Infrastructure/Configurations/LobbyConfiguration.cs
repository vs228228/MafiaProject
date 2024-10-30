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
    internal class LobbyConfiguration
    {
        public void Configure(EntityTypeBuilder<Lobby> builder)
        {
            builder.HasKey(l => l.Id);

            builder.HasMany(l => l.Players)
                   .WithOne()
                   .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
