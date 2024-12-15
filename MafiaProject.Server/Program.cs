using MafiaProject.Application.interfaces;
using MafiaProject.Application.Services;
using MafiaProject.Infrastructure.Mapper;
using MafiaProject.Server.middleware;
using MafiaProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using MafiaProject.Core.Interfaces;
using MafiaProject.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using MafiaProject.Infrastructure.Hubs;

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
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter your JWT Bearer token"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
            });



            // �����������
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IVoteRepository, VoteRepository>();
            builder.Services.AddScoped<IGameRepository, GameRepository>();
            builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
            builder.Services.AddScoped<ILobbyRepository, LobbyRepository>();


            // ������
            builder.Services.AddScoped<IMapperClass, Mapper>();
            builder.Services.AddAutoMapper(typeof(UserMappingProfile));
            builder.Services.AddAutoMapper(typeof(LobbyMappingProfile));
            builder.Services.AddAutoMapper(typeof(PlayerMappingProfile));
            builder.Services.AddAutoMapper(typeof(VoteMappingProfile));
            builder.Services.AddAutoMapper(typeof(GameMappingProfile));

            // PasswordHasher
            builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

            // TokenManager
            builder.Services.AddScoped<ITokenManager, TokenManager>();

            // �������� ������������
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<ILobbyService, LobbyService>();
            builder.Services.AddScoped<IPlayerService, PlayerService>();
            builder.Services.AddScoped<IVoteService, VoteService>();


            // ������������ ��
            builder.Services.AddDbContext<ApplicationDbContext>(
                o => o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    policy => policy
                        .WithOrigins(
                         "https://192.168.56.205:5173", 
                         "https://localhost:5173"    
                            )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                );
                options.AddPolicy("AllowAnyOrigin", policy =>
                     policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

            var jwtSettings = builder.Configuration.GetSection("JwtSettings");

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]))
                };
            });

            // signalR
            builder.Services.AddSignalR();

            var app = builder.Build();

            // ��������� �������� CORS
            app.UseCors("AllowSpecificOrigin");

            // ���
            app.MapHub<GameHub>("/hubs/GameHub");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();


            app.UseAuthentication();
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
