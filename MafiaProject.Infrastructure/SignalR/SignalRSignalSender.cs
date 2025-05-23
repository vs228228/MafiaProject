﻿using MafiaProject.Application.Interfaces;
using MafiaProject.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
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

        public async Task StartGame(string lobbyName)
        {
            await _hubContext.Clients.Group(lobbyName).SendAsync("StartGame", lobbyName);
        }

        public async Task EndGame(string lobbyName)
        {
            await _hubContext.Clients.Group(lobbyName).SendAsync("EndGame", lobbyName);
        }

        public async Task SendMessageToAll(string lobbyName, string message, string name)
        {
            await _hubContext.Clients.Group(lobbyName).SendAsync(name, message);
        }

        public async Task SendPersonalMessage(int playerId, string message, string name)
        {
            var connectionId = GameHub.PlayerConnectionMap.FirstOrDefault(kvp => kvp.Value == playerId.ToString()).Key;
            if (connectionId != null)
            {
                await _hubContext.Clients.Client(connectionId).SendAsync(name, message);
            }
        }

        public async Task ToggleMicrophone(int playerId, bool enabled)
        {
            await SendPersonalMessage(playerId, enabled.ToString(), "ToggleMicrophone");
        }

        public async Task ToggleCamera(int playerId, bool enabled)
        {
            await SendPersonalMessage(playerId, enabled.ToString(), "ToggleCamera");
        }

        public async Task SetMafiaVisibility(string lobbyName, bool enabled)
        {
            await _hubContext.Clients.Group($"{lobbyName}_Mafia").SendAsync("ToggleMafiaVisibility", enabled);
        }

        public async Task NotifyPlayerDeath(string lobbyName, int playerId)
        {
            await _hubContext.Clients.Group(lobbyName).SendAsync("PlayerDied", playerId);
            await SendPersonalMessage(playerId, "YouDied", "Notification");
            await ToggleMicrophone(playerId, false);
            await ToggleCamera(playerId, false);
        }

        public async Task NotifyLobbyUpdate(string lobbyName)
        {
            await _hubContext.Clients.Group(lobbyName).SendAsync("LobbyUpdated");
        }

        public async Task SendWebRTCSignal(int playerId, string signal)
        {
            var connectionId = GameHub.PlayerConnectionMap.FirstOrDefault(kvp => kvp.Value == playerId.ToString()).Key;
            if (connectionId != null)
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveSignal", signal);
            }
        }
    }
}
