using MafiaProject.Application.interfaces;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameService _gameService;

        public GameHub(IGameService gameService)
        {
            _gameService = gameService;
        }

        public async Task StartGame(int lobbyId)
        {
            await _gameService.StartGame(lobbyId);
            await Clients.Group($"Lobby_{lobbyId}").SendAsync("StartGame", lobbyId);
        }
    }

}
