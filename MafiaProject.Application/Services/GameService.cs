using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class GameService : IGameService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapperClass _mapper;

        public GameService(IUnitOfWork unitOfWork, IMapperClass mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task AssignRolesAsync(int gameId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            var arrPlayer = game.Players;
            string[] roles = {"Mafia", "Civilian", "Civilian", "Godfather", "Civilian", "Doctor", "Civilian", "Civilian", "Mafia", "Sheriff"};
            int[] array = Enumerable.Range(1, 10).ToArray(); // Создаем массив от 1 до 10
            Random rand = new Random();

            // Перемешиваем массив
            for (int i = array.Length - 1; i > 0; i--)
            {
                int j = rand.Next(0, i + 1);
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            int pos = 0;
            foreach (var player in arrPlayer)
            {
                player.Role = roles[array[pos] - 1];
                pos++;
            }

            game.Players = arrPlayer;
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ChangeGamePhaseAsync(int gameId, string phase)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            game.State = phase;
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task CreateGameAsync(CreateGameDTO createGameDTO)
        {
            var game = await _mapper.Map<CreateGameDTO, Game>(createGameDTO);
            await _unitOfWork.Games.CreateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteGameAsync(int gameId)
        {
            await _unitOfWork.Games.DeleteAsync(gameId);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DoctorHealAsync(DoctorDTO doctorDTO)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(doctorDTO.HealId);
            var game = await _unitOfWork.Games.GetByIdAsync(player.GameId);
            if (doctorDTO.HealId != game.WhoLastHealed)
            {
                game.WhoLastHealed = doctorDTO.HealId;
            }
            else
            {
                game.WhoLastHealed = 0;
            }
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<Player>> GetAlivePlayersAsync(int gameId)
        {
            return await _unitOfWork.Games.GetAlivePlayersCountAsync(gameId);
        }

        public async Task<GameDTO> GetGameByIdAsync(int id)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(id);
            return await _mapper.Map<Game, GameDTO>(game);
        }

        public async Task<bool> GodfatherCheckAsync(GodfatherDTO godfatherDTO)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(godfatherDTO.CheckId);
            if (player.Role == "Sheriff")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> IsKilledAsync(int gameId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            int i = 0;
            int[] arr = new int[game.Votes.Count];
            int ans = 0;
            bool solver = false;
            if (game.CountOfMafia == game.Votes.Count)
            {

                foreach (var mafia in game.Votes)
                {
                    arr[i] = mafia.PlayerToKickId;
                    i++;
                }

                ans = arr[0];

                for (int j = 1; j < arr.Length; j++) {
                    if (arr[j] != ans)
                    {
                        ans = 0;
                        break;
                    }
                }
                if (ans != 0 && ans != game.WhoLastHealed)
                {
                    solver = true;
                }
                else
                {
                    solver = false;
                }
            }
            else
            {
                solver = false;
            }
            if (solver)
            {
                var player = await _unitOfWork.Players.GetByIdAsync(ans);
                player.IsAlive = false;
                await _unitOfWork.Players.UpdateAsync(player);
            }
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
            return solver;
        }

        public async Task MafiaShootAsync(MafiaDTO mafiaVote)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(mafiaVote.TargetId);
            var game = await _unitOfWork.Games.GetByIdAsync(player.GameId);
            var vote = await _mapper.Map<MafiaDTO, Vote>(mafiaVote);
            game.Votes.Add(vote);
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task NextPlayerTalk(PlayerTalkDTO playerTalkDTO)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(playerTalkDTO.PlayerId);
            player.IsMicrophoneOn = true;
            await _unitOfWork.Players.UpdateAsync(player);
            await _unitOfWork.SaveChangesAsync();
        }

        public Task NotifyPlayersAsync(int gameId, string message)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> PoliceCheckAsync(PoliceDTO policeDTO)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(policeDTO.CheckId);
            return player.IsMafia;
        }

        public Task ProcessDayAction(int gameId)
        {
            throw new NotImplementedException();
        }

        public Task ProcessNightAction(int gameId)
        {
            throw new NotImplementedException();
        }

        public Task StartGame(int gameId)
        {
            throw new NotImplementedException();
        }

        public Task StartNextRound(int gameId)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateGameAsync(UpdateGameDTO updateGameDTO)
        {
            var game = await _mapper.Map<UpdateGameDTO, Game>(updateGameDTO);
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
