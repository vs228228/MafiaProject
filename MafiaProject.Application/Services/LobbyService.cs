using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.Pagination;
using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapperClass _mapper;

        public LobbyService(IUnitOfWork unitOfWork, IMapperClass mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task ConnectToLobbyAsync(int lobbyId, int userId)
        {
            try
            {
                var lobby = await _unitOfWork.Lobbies.GetByIdAsync(lobbyId); // make by repository not by service
                if (lobby == null)
                {
                    throw new KeyNotFoundException("Lobby not found");
                }

                var user = await _unitOfWork.Users.GetByIdAsync(userId);
                if (user == null)
                {
                    throw new KeyNotFoundException("User not found");
                }
                user.isPlayer = true;
                var player = ConvertUserToPlayer(user, lobbyId);
                if (player == null)
                {
                    throw new KeyNotFoundException("Player not found");
                }

                if (lobby.Players == null)
                {
                    lobby.Players = new List<Player>();
                }
                lobby.Players.Add(player);
                lobby.CountOfPlayers++;

                if (lobby.CountOfPlayers >= 10) // Assuming 10 is the max number of players
                {
                    lobby.IsLobbyFull = true;
                }
                await _unitOfWork.Lobbies.UpdateAsync(lobby);
                await _unitOfWork.Users.UpdateAsync(user);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Логирование ошибки
                throw new Exception($"Error connecting to lobby: {ex.Message}", ex);
            }
        
        }

        public async Task CreateLobbyAsync(LobbyCreateDTO lobbyCreateDTO)
        {
            var lobby = await _mapper.Map<LobbyCreateDTO, Lobby>(lobbyCreateDTO);
            await _unitOfWork.Lobbies.CreateAsync(lobby);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteLobbyAsync(int id)
        {
            var lobby = await _unitOfWork.Lobbies.GetByIdAsync(id);
            if (lobby == null) throw new KeyNotFoundException();
            await _unitOfWork.Lobbies.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DisconnectToLobbyAsync(int lobbyId, int playerId) // create new player repository and remake this method
        {
            try
            {
            var lobby = await _unitOfWork.Lobbies.GetByIdAsync(lobbyId);
            if (lobby == null)
            {
                throw new KeyNotFoundException("Lobby not found");
            }

            var player = await _unitOfWork.Players.GetByIdAsync(playerId);

            if (player == null)
            {
                throw new KeyNotFoundException("Player not found");
            }

            lobby.Players.Remove(player);
            lobby.CountOfPlayers--;
            var user = await _unitOfWork.Users.GetByIdAsync(player.UserId);
            user.isPlayer = false;

            if (lobby.CountOfPlayers < 10) // Assuming 10 is the max number of players
            {
                lobby.IsLobbyFull = false;
            }
            await _unitOfWork.Lobbies.UpdateAsync(lobby);
            await _unitOfWork.Users.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Логирование ошибки
                throw new Exception($"Error exit from lobby: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<LobbyDTO>> GetAllLobbiesAsync()
        {
            var ans = await _unitOfWork.Lobbies.GetAllAsync();
            return await _mapper.Map<IEnumerable<Lobby>, IEnumerable<LobbyDTO>>(ans);
        }

        public async Task<IEnumerable<PlayerDTO>> GetAllPlayersAsync(int lobbyId)
        {
            var ans = await _unitOfWork.Lobbies.GetAllPlayersAsync();
            return await _mapper.Map<IEnumerable<Player>, IEnumerable<PlayerDTO>>(ans);
        }

        public async Task<LobbyDTO> GetLobbyByIdAsync(int id)
        {
            var ans = await _unitOfWork.Lobbies.GetByIdAsync(id);
            if (ans == null)
            {
                throw new KeyNotFoundException();
            }
            return await _mapper.Map<Lobby, LobbyDTO>(ans);
        }

        public async Task<PagedResult<LobbyDTO>> GetPaginatedLobiesAsync(int pageNumber, int pageSize)
        {
            var result = await _unitOfWork.Lobbies.GetLobbiesAsync(pageNumber, pageSize);
            var ans = new PagedResult<LobbyDTO>
            {
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalCount = result.Value,
                Items = await _mapper.Map<IEnumerable<Lobby>, IEnumerable<LobbyDTO>>(result.Key)
            };
            return ans;
        }

        public async Task StartGameAsync(int lobbyId)
        {
            var lobby = await _unitOfWork.Lobbies.GetByIdAsync(lobbyId);
            if (lobby == null)
            {
                throw new KeyNotFoundException();
            }
            int num = 0;
            foreach(Player player in lobby.Players)
            {
                if(player.IsReady == true)
                {
                    num++;
                }
            }
            if(lobby.CountOfPlayers == 10 && num == 10)
            {
                var game = new Game
                {
                    Name = lobby.Name,
                    State = "Started",
                    Players = lobby.Players,
                    CountOfAlive = 10,
                    CountOfMafia = 3,
                    IsGameEnded = false,
                    RoundNumber = 0
                };
                lobby.IsLobbyActive = true;
                await _unitOfWork.Games.CreateAsync(game);
            }
            else
            {
                throw new NotImplementedException();
            }
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateLobbyAsync(LobbyUpdateDTO lobbyUpdateDTO)
        {
            Lobby lobby = await _unitOfWork.Lobbies.GetByIdAsync(lobbyUpdateDTO.Id);
            var ans = await _mapper.Update(lobbyUpdateDTO, lobby);
            await _unitOfWork.Lobbies.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }
        private Player ConvertUserToPlayer(User user, int lobbyId)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var player = new Player
            {
                UserId = user.Id,
                User = user,
                LobbyId = lobbyId,
                Position = 1, // Начальная позиция, можно изменить если нужно
                Role = "Citizen", // Начальная роль, можно изменить если нужно
                IsReady = false,
                IsAlive = true,
                IsMafia = false,
                IsCameraOn = false,
                IsMicrophoneOn = false,
                ConnectionId = string.Empty, // Будет установлен при подключении к SignalR
            };
            user.Player = player;
            return player;
        }
    }
}
