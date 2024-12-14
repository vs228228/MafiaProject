using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        public static readonly ConcurrentDictionary<string, string> PlayerConnectionMap = new();

        public async Task JoinLobby(string lobbyName, int playerId)
        {
            string connectionId = Context.ConnectionId;
            PlayerConnectionMap[connectionId] = playerId.ToString();

            await Clients.Group(lobbyName).SendAsync("UserJoined", playerId);
            await Groups.AddToGroupAsync(connectionId, lobbyName);

            // Notify the new user about all existing users in the lobby
            var existingPlayerIds = PlayerConnectionMap
                .Where(kvp => kvp.Value != playerId.ToString())
                .Select(kvp => kvp.Value);

            await Clients.Caller.SendAsync("ExistingUsers", existingPlayerIds);
        }

        public async Task LeaveLobby(string lobbyName)
        {
            string connectionId = Context.ConnectionId;

            if (PlayerConnectionMap.TryRemove(connectionId, out string? playerId))
            {
                await Groups.RemoveFromGroupAsync(connectionId, lobbyName);
                await Clients.Group(lobbyName).SendAsync("UserLeft", int.Parse(playerId));
            }
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Connected", Context.ConnectionId);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            string connectionId = Context.ConnectionId;

            if (PlayerConnectionMap.TryRemove(connectionId, out string? playerId))
            {
                await Clients.All.SendAsync("Disconnected", int.Parse(playerId));
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task RelaySignal(int targetPlayerId, string signal)
        {
            var targetConnectionId = PlayerConnectionMap.FirstOrDefault(kvp => kvp.Value == targetPlayerId.ToString()).Key;
            if (targetConnectionId != null)
            {
                await Clients.Client(targetConnectionId).SendAsync("ReceiveSignal", signal);
            }
        }
    }
}
