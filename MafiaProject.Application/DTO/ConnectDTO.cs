using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.DTO
{
    public class ConnectDTO
    {
        public int lobbyId { get; set; }
        public int userId { get; set; }
        public string? password { get; set; } = "";
    }
}
