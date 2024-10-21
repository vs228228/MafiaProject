using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MafiaProject.Application.Services
{
    public class PhotoService
    {
        public async Task<string> SaveUserProfilePhotoAsync(IFormFile photo, string userId)
        {
            string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "UserPhotos");
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

            return filePath;
        }
    }
}
