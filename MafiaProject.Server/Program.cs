using MafiaProject.Application.interfaces;
using MafiaProject.Application.Services;
using MafiaProject.Infrastructure.Mapper;
using MafiaProject.Server.middleware;
using MafiaProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MafiaProject.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();



            // репозитории
            //   builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            // маппер
            builder.Services.AddScoped<IMapperClass, Mapper>();
            builder.Services.AddAutoMapper(typeof(UserMappingProfile));
            builder.Services.AddAutoMapper(typeof(LobbyMappingProfile));
            builder.Services.AddAutoMapper(typeof(PlayerMappingProfile));
            builder.Services.AddAutoMapper(typeof(VoteMappingProfile));

            // инъекция зависимостей
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<ILobbyService, LobbyService>();


            // настраивание бд
            builder.Services.AddDbContext<ApplicationDbContext>(
                o => o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    policy => policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                );
            });

            var app = builder.Build();

            // Применяем политику CORS
            app.UseCors("AllowSpecificOrigin");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "swagger"; 
            });


            app.UseMiddleware<ExceptionHandlingMiddleware>();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
