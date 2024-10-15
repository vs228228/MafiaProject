namespace MafiaProject.Application.DTO
{
    public class PlayerUpdateDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Мы его менять не будем, поэтому не уверен, нужно ли это поле тут 
        public bool IsAlive { get; set; }
        public string ConnectionId { get; set; }
    }
}
