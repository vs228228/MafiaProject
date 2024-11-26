using MafiaProject.Application.interfaces;
using MafiaProject.Infrastructure.Hubs;
using Microsoft.AspNet.SignalR;
using System;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.SignalR
{
    public class SignalRSignalSender : ISignalSender
    {
        private readonly IHubContext _hubContext;

        public SignalRSignalSender(IHubContext hubContext)
        {
            _hubContext = hubContext;
        }
        void ISignalSender.StartGame(int lobbyId)
        {
            _hubContext.Clients.Group($"Lobby_{lobbyId}").invoke("StartGame", lobbyId);
        }

        void ISignalSender.EndGame(int gameId)
        {
            _hubContext.Clients.Group($"Game_{gameId}").invoke("EndGame", gameId);
        }

        void ISignalSender.SendMessageAll(int gameId, string message)
        {
            _hubContext.Clients.Group($"Game_{gameId}").invoke("ReceiveMessage", message);
        }

        void ISignalSender.SendPersonalMessage(int gameId, int playerId, string message)
        {
            _hubContext.Clients.User(playerId.ToString()).invoke("ReceiveMessage", message);
        }
    }
}
