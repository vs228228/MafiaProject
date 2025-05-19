using MafiaProject.Core.Entityes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.interfaces
{
    public interface ITokenManager
    {
        RefreshToken GenerateRefreshToken();
        string GenerateAccessToken(User user);
    }
}
