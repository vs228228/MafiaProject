using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.interfaces
{
    public interface ISignalSender
    {
        public Task StartGame(int lobbyId);
        public Task EndGame(int gameId);
        public Task SendMessageAll(int gameId, string message);
        public Task SendPersonalMessage(int gameId, int playerId, string message);
    }
}
