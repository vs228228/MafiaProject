using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.interfaces
{
    public interface ISignalSender
    {
        public void StartGame(int lobbyId);
    }
}
