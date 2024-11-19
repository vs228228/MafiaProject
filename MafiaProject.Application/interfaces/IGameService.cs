using MafiaProject.Application.DTO;
using MafiaProject.Core.Entityes;

namespace MafiaProject.Application.interfaces
{
    public interface IGameService
    {
        public Task<GameDTO> GetGameByIdAsync(int id);
        public Task CreateGameAsync(CreateGameDTO createGameDTO);
        public Task UpdateGameAsync(UpdateGameDTO updateGameDTO);
        public Task DeleteGameAsync(int gameId);

        public Task StartGame(int gameId);
        public Task<IEnumerable<Player>> GetAlivePlayersAsync(int gameId);
        public Task ChangeGamePhaseAsync(int gameId, string phase); //dto не нужен т.к.обновлять фазу будет какой-то метод с сервера
        public Task NotifyPlayersAsync(int gameId, string message);

        public Task AssignRolesAsync(int gameId);

        public Task MafiaShootAsync(MafiaDTO mafiaVote);// в теории в мафиа воут будет gameId, mafiaId, targetId.Но если буду проблемы, то можно разделить будет
        public Task<bool> PoliceCheckAsync(PoliceDTO policeDTO);// тут будет тоже gameId, policeId, targetId и возвращает true - мафия, false - мирный
        public Task DoctorHealAsync(DoctorDTO doctorDTO);// дто аналогично двум выше

        public Task<bool> GodfatherCheckAsync(GodfatherDTO godfatherDTO);

        public Task<bool> IsKilledAsync(int gameId);

        public Task NextPlayerTalk(PlayerTalkDTO playerTalkDTO); // тут в общем в дто будет передаваться два поля - gameId и PlayerId - это тот плеер, который говорил

        Task StartNextRound(int gameId); //фазу новую будет начинать либо ProcessNight, либо ProcessDay, либо NextPlayerTalk, потому приватный метод
        Task ProcessNightAction(int gameId); //тут будет проверяться попала ли мафия после того, как доктор похилил.И тут же всем юзерам напишет был ли кто-то убит
        Task ProcessDayAction(int gameId);// а тут будут проверяться дневные голосования все 3 метода являюся private
    }
}
