using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace MafiaProject.Server.middleware
{
    
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";

            context.Response.StatusCode = ex switch
            {
                KeyNotFoundException => (int)HttpStatusCode.NotFound,
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                ArgumentException => (int)HttpStatusCode.BadRequest,
                _ => (int)HttpStatusCode.InternalServerError
            };

            var errorResponse = CreateErrorResponse(context.Response.StatusCode, ex);

            return context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        }

        private object CreateErrorResponse(int statusCode, Exception ex)
        {
            return statusCode switch
            {
                (int)HttpStatusCode.NotFound => new { StatusCode = statusCode },
                (int)HttpStatusCode.Unauthorized => new { StatusCode = statusCode },
                (int)HttpStatusCode.BadRequest => new { StatusCode = statusCode, ex.Message },
                _ => new { StatusCode = statusCode, Message = "Произошла ошибка в обработке запроса", Details = ex.Message }
            };
        }
    }

}
