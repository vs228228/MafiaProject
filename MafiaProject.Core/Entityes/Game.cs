namespace MafiaProject.Core.Entityes
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public int CountOfAlive { get; set; } = 10;
        public int CountOfMafia { get; set; } = 3;
        public bool IsGameEnded { get; set; } = false;
        public int RoundNumber { get; set; } = 0;
        public int WhoLastHealed { get; set; }

        public ICollection<Player> VoteCandidates { get; set; }

        public ICollection<Vote> Votes { get; set; }
        public ICollection<Player> Players { get; set; }


    }
}
