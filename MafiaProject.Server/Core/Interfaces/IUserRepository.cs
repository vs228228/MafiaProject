using MafiaProject.Server.Core.Entityes;

namespace MafiaProject.Server.Core.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserByEmailAsync(string email);
    }
}
