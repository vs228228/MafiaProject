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
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Nick).IsRequired().HasMaxLength(50);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(100);
            builder.Property(u => u.pathToPic).HasMaxLength(200);
            builder.Property(u => u.RefreshToken).HasMaxLength(200);
            builder.Property(u => u.isPlayer).HasDefaultValue(false);
            builder.HasOne(u => u.Player).WithOne(p => p.User).HasForeignKey<Player>(p => p.UserId);
        }


    }
}
