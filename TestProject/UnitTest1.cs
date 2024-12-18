using MafiaProject.Server.Controllers;
using MafiaProject.Application.interfaces;
using MafiaProject.Application.DTO;
using Microsoft.AspNetCore.Mvc;
using Moq;
namespace TestProject
{
    public class UnitTest1
    {
        private readonly Mock<IUserService> _mockUserService;
        private readonly UserController _controller;
        public UnitTest1()
        {
            _mockUserService = new Mock<IUserService>();
            _controller = new UserController(_mockUserService.Object);
        }
        [Fact]
        public async Task GetUserByIdAsync_ReturnsOkResult_WithUser()
        {
            var userId = 1;
            var user = new UserDTO { Id = userId, Nick = "Test User" };
            _mockUserService.Setup(service => service.GetUserByIdAsync(userId)).ReturnsAsync(user);
            var result = await _controller.GetUserByIdAsync(userId);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedUser = Assert.IsType<UserDTO>(okResult.Value);
            Assert.Equal(userId, returnedUser.Id);
        }
        [Fact]
        public async Task DeleteUser_ReturnsNoContentResult()
        {
            var userId = 1;
            var result = await _controller.DeleteUser(userId);
            Assert.IsType<NoContentResult>(result);
        }
    }

}