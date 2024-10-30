using MafiaProject.Core.Entityes;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Configurations
{
    internal class UserConfiguration
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);

            builder.HasOne(u => u.Player)
                   .WithOne()
                   .HasForeignKey<Player>(p => p.Id)
                   .OnDelete(DeleteBehavior.Cascade);
        }


    }
}
