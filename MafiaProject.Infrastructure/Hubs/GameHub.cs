using MafiaProject.Application.interfaces;
using MafiaProject.Core.Interfaces;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameService _gameService;
        private readonly IUnitOfWork _unitOfWork;

        public GameHub(IGameService gameService, IUnitOfWork unitOfWork)
        {
            _gameService = gameService;
            _unitOfWork = unitOfWork;
        }

        public async Task StartGame(int lobbyId)
        {
            await _gameService.StartGame(lobbyId);
            await Clients.Group($"Lobby_{lobbyId}").SendAsync("StartGame", lobbyId);
        }

        //public async Task OnConnectedAsync()
        //{
        //    // Получаем HTTP контекст из текущего подключения SignalR
        //    var context = Context.GetHttpContext;

        //    // Ищем идентификатор пользователя в клеймах (claims) текущего пользователя
        //    // ClaimTypes.NameIdentifier обычно содержит ID пользователя
        //    var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        //    // Пытаемся преобразовать строковый ID в число
        //    if (int.TryParse(userId, out int parsedUserId))
        //    {
        //        // Если преобразование успешно, получаем пользователя из базы данных
        //        var user = await _unitOfWork.Users.GetByIdAsync(parsedUserId);

        //        // Если пользователь существует и у него есть связанный Player
        //        if (user?.Player != null)
        //        {
        //            // Сохраняем ConnectionId (уникальный идентификатор SignalR подключения)
        //            // в поле ConnectionId объекта Player
        //            user.Player.ConnectionId = Context.ConnectionId;

        //            // Сохраняем изменения в базе данных
        //            await _unitOfWork.SaveChangesAsync();
        //        }
        //    }

        //    // Вызываем базовую реализацию метода
        //    await base.OnConnectedAsync();
        //}
    }

}
