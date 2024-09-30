namespace MafiaProject.Server.Core.Entityes
{
    public class User
    {
        public int Id { get; set; }
        public string Nick { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int CountOfGame { get; set; }
        public int Victories {  get; set; }

        public Player Player { get; set; }

    }
}
