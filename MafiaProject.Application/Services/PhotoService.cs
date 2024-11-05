using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class PhotoService
    {
        public async Task<string> SaveUserProfilePhotoAsync(IFormFile photo, string userId)
        {
            string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            string fileName = $"{userId}_{DateTime.Now.Ticks}{Path.GetExtension(photo.FileName)}";
            string filePath = Path.Combine(directoryPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            // Возвращаем относительный путь для использования в приложении (например, для доступа через URL)
            return Path.Combine("images", fileName);
        }
    }
}
