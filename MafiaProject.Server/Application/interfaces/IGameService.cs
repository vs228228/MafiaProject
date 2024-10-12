namespace MafiaProject.Server.Application.interfaces
{
    public interface IGameService
    {
     //   public Task<GameDTO> GetGameByIdAsync(int id);
     //   public Task CreateGameAsync(CreateGameDTO);
     //   public Task UpdateGameAsync(UpdateGameDTO);
     //   public Task DeleteGameAsync(int gameId);

        // public Task StartGame(int gameId);
        // public Task GetAlivePlayersAsync(int gameId);
        // public Task ChangeGamePhaseAsync(int gameId, string phase);  dto не нужен т.к. обновлять фазу будет какой-то метод с сервера
        // public Task NotifyPlayersAsync(int gameId, string message);

        // public Task AssignRolesAsync(int gameId);

        // public Task MafiaShootAsync(VoteDTO mafiaVote); в теории в мафиа воут будет gameId, mafiaId, targetId. Но если буду проблемы, то можно разделить будет
        // public Task<bool> PoliceCheckAsync(PoliceDTO); тут будет тоже gameId, policeId, targetId и возвращает true - мафия, false - мирный
        // public Task DoctorHealAsync(DoctorDTO); дто аналогично двум выше

        // public Task NextPlayerTalk(PlayerTalkDTO); тут в общем в дто будет передаваться два поля - gameId и PlayerId - это тот плеер, который говорил

        // private Task StartNextRound(int gameId); фазу новую будет начинать либо ProcessNight, либо ProcessDay, либо NextPlayerTalk, потому приватный метод
        // private Task ProcessNightAction(gameId); тут будет проверяться попала ли мафия после того, как доктор похилил. И тут же всем юзерам напишет был ли кто-то убит
        // private TaskProcessDayAction(gameId); а тут будут проверяться дневные голосования
    }
}
