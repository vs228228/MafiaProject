namespace MafiaProject.Server.Core.Entityes
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public int CountOfAlive { get; set; }
        public int CountOfMafia { get; set; }
        public bool IsGameEnded { get; set; }
        public int RoundNumber { get; set; }

        public ICollection<Player> VoteCandidates {  get; set; }

        public IEnumerable<Vote> Votes { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
