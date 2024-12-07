using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        // Метод для присоединения пользователя к лобби по имени
        public async Task JoinLobby(string lobbyName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyName);
            await Clients.Group(lobbyName).SendAsync("UserJoined", Context.ConnectionId);
        }

        // Метод для выхода пользователя из лобби по имени
        public async Task LeaveLobby(string lobbyName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbyName);
            await Clients.Group(lobbyName).SendAsync("UserLeft", Context.ConnectionId);
        }

        // При подключении выводим connectionId
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Connected", Context.ConnectionId);
        }

        // При отключении уведомляем всех о disconnect
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
            await Clients.All.SendAsync("Disconnected", Context.ConnectionId);
        }

        // Новый метод для обработки сигналов WebRTC
        public async Task RelaySignal(string connectionId, string signal)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveSignal", signal);
        }
    }
}
