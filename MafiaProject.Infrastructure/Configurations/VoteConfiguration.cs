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
    internal class VoteConfiguration : IEntityTypeConfiguration<Vote>
    {
        public void Configure(EntityTypeBuilder<Vote> builder)
        {
            builder.HasKey(v => v.VoteId);
            builder.Property(v => v.VoterId).IsRequired();
            builder.Property(v => v.PlayerToKickId).IsRequired();
        }
    }
}
