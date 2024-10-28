namespace MafiaProject.Core.Entityes
{
    public class User
    {
        // хранит только и нформацию о пользователе и не больше
        public int Id { get; set; }
        public string Nick { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string pathToPic { get; set; }
        public int CountOfGame { get; set; }
        public int Victories { get; set; }

        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
        public bool isPlayer { get; set; }

        public Player Player { get; set; }

    }
}
