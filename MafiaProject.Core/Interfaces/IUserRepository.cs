using MafiaProject.Core.Entityes;

namespace MafiaProject.Core.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserByEmailAsync(string email);
    }
}
