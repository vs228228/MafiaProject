using MafiaProject.Application.interfaces;
using MafiaProject.Core.Entityes;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Infrastructure.Data
{
    public class TokenManager : ITokenManager
    {
        private readonly IConfiguration _configuration;
        private readonly string _secret;
        private readonly int _accessTokenExpirationMinutes;
        private readonly int _refreshTokenExpirationDays;

        public TokenManager(IConfiguration configuration)
        {
            _configuration = configuration;
            _secret = _configuration["JwtSettings:Secret"];
            _accessTokenExpirationMinutes = int.Parse(_configuration["JwtSettings:AccessTokenExpirationMinutes"]);
            _refreshTokenExpirationDays = int.Parse(_configuration["JwtSettings:RefreshTokenExpirationDays"]);
        }

        public RefreshToken GenerateRefreshToken()
        {
            var rng = new Random();
            var bytes = new byte[32];
            rng.NextBytes(bytes);
            var tokenInfo = Convert.ToBase64String(bytes);
            RefreshToken token = new RefreshToken()
            {
                Token = tokenInfo,
                Expiration = DateTime.Now.AddDays(_refreshTokenExpirationDays)
            };
            return token;
        }

        public string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);
            int id = user.Id;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.Now.AddMinutes(_accessTokenExpirationMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
