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
        private readonly ISignalSender _signalSender;

        public GameService(IUnitOfWork unitOfWork, IMapperClass mapper, ISignalSender signalSender)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _signalSender = signalSender;
        }

        public async Task AssignRolesAsync(int gameId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            var arrPlayer = game.Players;
            string[] roles = { "Mafia", "Civilian", "Civilian", "Godfather", "Civilian", "Doctor", "Civilian", "Civilian", "Mafia", "Sheriff" };
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
            var game = await _unitOfWork.Games.GetByIdAsync((int)player.GameId);
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

        private async Task<int> IsKilledAsync(int gameId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            int i = 0;
            int[] arr = new int[game.Votes.Count];
            int ans = 0;
            bool solver = false;
            int result = 0;
            if (game.CountOfMafia == game.Votes.Count)
            {

                foreach (var mafia in game.Votes)
                {
                    arr[i] = mafia.PlayerToKickId;
                    i++;
                }

                ans = arr[0];

                for (int j = 1; j < arr.Length; j++)
                {
                    if (arr[j] != ans)
                    {
                        ans = -1;
                        break;
                    }
                }
                if (ans != -1 && ans != game.WhoLastHealed)
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
                result = player.Id;
                player.IsAlive = false;
                game.Players.Remove(player);
                await _unitOfWork.Players.UpdateAsync(player);
            }
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task MafiaShootAsync(MafiaDTO mafiaVote)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(mafiaVote.TargetId);
            var game = await _unitOfWork.Games.GetByIdAsync((int)player.GameId);
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

        public async Task NotifyPlayersAsync(int gameId, string message)
        {
            await _signalSender.SendMessageAll(gameId, message, "Notify");
        }

        public async Task<bool> PoliceCheckAsync(PoliceDTO policeDTO)
        {
            var player = await _unitOfWork.Players.GetByIdAsync(policeDTO.CheckId);
            return player.IsMafia;
        }

        public async Task ProcessDayAction(int gameId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            var votes = game.Votes;
            int[] arr = new int[1000000];
            int ans = 0;
            int max = 1;
            foreach (var vote in votes)
            {
                arr[vote.PlayerToKickId]++;
            }

            for(int i = 0; i < arr.Length; i++)
            {
                if(max < arr[i])
                {
                    max = arr[i];
                    ans = i;
                }
            }
            var player = await _unitOfWork.Players.GetByIdAsync(ans);
            player.IsAlive = false;
            game.Players.Remove(player);
            await _signalSender.SendMessageAll(gameId, "The " + player.Position.ToString() + "th was voted", "Vote");
            await _unitOfWork.Players.UpdateAsync(player);
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ProcessNightAction(int gameId)
        {
            var killedPlayerId = await IsKilledAsync(gameId);
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            game.Votes.Clear();
            if (killedPlayerId != 0)
            {
                var player = await _unitOfWork.Players.GetByIdAsync(killedPlayerId);
                await _signalSender.SendMessageAll(gameId, "The " + player.Position.ToString() + "th was killed at night", "MafiaKill");
            }
            else
            {
                await _signalSender.SendMessageAll(gameId, "Nobody was killed at night", "MafiaKill");
            }
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task StartGame(int gameId)
        {
            await _signalSender.StartGame(gameId);
            await AssignRolesAsync(gameId);
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            foreach (var player in game.Players)
            {
                await _signalSender.SendPersonalMessage(gameId, player.Id, "Your role is " + player.Role, "RoleNotify");
            }

            foreach (var player in game.Players)
            {
                if (player.IsMafia)
                {
                    player.IsCameraOn = true;
                }
            }

            await _signalSender.SendMessageAll(gameId, "Знакомство мафии началось. У вас есть 60 секунд.", "MafiaStart");
            await Task.Delay(60000);

            foreach (var player in game.Players)
            {
                if (player.IsMafia)
                {
                    player.IsCameraOn = false;
                }
            }

            await _signalSender.SendMessageAll(gameId, "Время знакомства закончилось.", "MafiaStop");
        }

        public async Task StartNextRound(int gameId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            game.RoundNumber++;
            var players = game.Players;
            int n = 0;
            foreach (var player in players)
            {
                if (player.IsAlive)
                {
                    n++;
                }
                if (n == game.RoundNumber)
                {
                    player.IsMicrophoneOn = true;
                    await _unitOfWork.Players.UpdateAsync(player);
                    break;
                }
            }
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateGameAsync(UpdateGameDTO updateGameDTO)
        {
            Game game = await _unitOfWork.Games.GetByIdAsync(updateGameDTO.Id);
            var ans = await _mapper.Update(updateGameDTO, game);
            await _unitOfWork.Games.UpdateAsync(ans);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task AddVoteCandidate(int gameId, int candidateId, int WhoAddId)
        {
            var game = await _unitOfWork.Games.GetByIdAsync(gameId);
            var player = await _unitOfWork.Players.GetByIdAsync(candidateId);
            game.VoteCandidates.Add(player);
            await _unitOfWork.Games.UpdateAsync(game);
            await _unitOfWork.SaveChangesAsync();
        }

    }
}
