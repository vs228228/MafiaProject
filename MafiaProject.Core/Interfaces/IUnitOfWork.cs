namespace MafiaProject.Core.Interfaces
{
    public interface IUnitOfWork
    {
        public IUserRepository Users { get; set; }
        public ILobbyRepository Lobbies { get; set; }
        public IGameRepository Games { get; set; }
        //public IPlayerRepository Player { get; set; }

        public IVoteRepository Votes { get; set; }

        public Task SaveChangesAsync();
    }
}
