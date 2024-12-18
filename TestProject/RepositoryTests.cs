using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MafiaProject.Infrastructure.Repositories;
using Moq;
using Xunit;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace TestProject
{
    public class RepositoryTests
    {
        private readonly Mock<DbContext> _mockContext;
        private readonly Mock<DbSet<TestEntity>> _mockDbSet;
        private readonly Repository<TestEntity> _repository;

        public RepositoryTests()
        {
            _mockContext = new Mock<DbContext>();
            _mockDbSet = new Mock<DbSet<TestEntity>>();
            _mockContext.Setup(m => m.Set<TestEntity>()).Returns(_mockDbSet.Object);
            _repository = new Repository<TestEntity>(_mockContext.Object);
        }

        [Fact]
        public async Task CreateAsync_AddsEntityToDbSet()
        {
            var entity = new TestEntity();

            await _repository.CreateAsync(entity);

            _mockDbSet.Verify(m => m.AddAsync(entity, default), Times.Once);
            _mockContext.Verify(m => m.SaveChangesAsync(default), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_RemovesEntityFromDbSet()
        {
            var entity = new TestEntity { Id = 1 };
            _mockDbSet.Setup(m => m.FindAsync(1)).ReturnsAsync(entity);

            await _repository.DeleteAsync(1);

            _mockDbSet.Verify(m => m.Remove(entity), Times.Once);
            _mockContext.Verify(m => m.SaveChangesAsync(default), Times.Once);
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsEntity()
        {
            var entity = new TestEntity { Id = 1 };
            _mockDbSet.Setup(m => m.FindAsync(1)).ReturnsAsync(entity);

            var result = await _repository.GetByIdAsync(1);

            Assert.Equal(entity, result);
        }
    }


    public class TestEntity
    {
        public int Id { get; set; }
    }
}

