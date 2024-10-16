using MafiaProject.Application.DTO;
using MafiaProject.Application.interfaces;
using MafiaProject.Core.Entityes;
using MafiaProject.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    //public class UserService : IUserService
    //{
    //    private readonly IUnitOfWork _unitOfWork;
    //    private readonly IMapper _mapper;

    //    public UserService(IUnitOfWork unitOfWork, IMapper mapper)
    //    {
    //        _unitOfWork = unitOfWork;
    //        _mapper = mapper;
    //    }

    //    public async Task<UserDTO> GetUserByEmailAsync(string email)
    //    {

    //        var ans = await _unitOfWork.Users.GetUserByEmailAsync(email);
    //        return await _mapper.Map<User, UserDTO>(ans);

    //    }
    //}
}
