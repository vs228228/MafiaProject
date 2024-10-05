namespace MafiaProject.Server.Core.Interfaces
{
    public interface IUnitOfWork
    {
        public IUserRepository Users { get; set; }
        public ILobbyRepository Lobbies { get; set; }
        public IGameRepository Games { get; set; }

        public Task SaveChangesAsync();
    }
}
