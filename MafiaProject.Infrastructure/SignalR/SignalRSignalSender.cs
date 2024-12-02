
using MafiaProject.Application.interfaces;
using MafiaProject.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.SignalR
{
    public class SignalRSignalSender : ISignalSender
    {
        private readonly IHubContext<GameHub> _hubContext;

        public SignalRSignalSender(IHubContext<GameHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task StartGame(int lobbyId)
        {
            await _hubContext.Clients.Group($"Lobby_{lobbyId}").SendAsync("StartGame", lobbyId);
        }

        public async Task EndGame(int gameId)
        {
            await _hubContext.Clients.Group($"Game_{gameId}").SendAsync("EndGame", gameId);
        }

        public async Task SendMessageAll(int gameId, string message)
        {
            await _hubContext.Clients.Group($"Game_{gameId}").SendAsync("ReceiveMessage", message);
        }

        public async Task SendPersonalMessage(int gameId, int playerId, string message)
        {
            await _hubContext.Clients.User(playerId.ToString()).SendAsync("ReceiveMessage", message);
        }
    }
}
