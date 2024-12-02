using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        // Метод для подключения клиента к группе лобби
        public async Task JoinLobby(int lobbyId)
        {
            string groupName = $"Lobby_{lobbyId}";
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("UserJoined", Context.ConnectionId);
        }

        // Метод для отключения клиента от группы лобби
        public async Task LeaveLobby(int lobbyId)
        {
            string groupName = $"Lobby_{lobbyId}";
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("UserLeft", Context.ConnectionId);
        }

        // Метод для подключения клиента к группе игры
        public async Task JoinGame(int gameId)
        {
            string groupName = $"Game_{gameId}";
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("UserJoinedGame", Context.ConnectionId);
        }

        // Метод для отключения клиента от группы игры
        public async Task LeaveGame(int gameId)
        {
            string groupName = $"Game_{gameId}";
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("UserLeftGame", Context.ConnectionId);
        }

        // Переопределение метода OnConnectedAsync
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Connected", Context.ConnectionId);
        }

        // Переопределение метода OnDisconnectedAsync
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
            await Clients.All.SendAsync("Disconnected", Context.ConnectionId);
        }
    }
}
