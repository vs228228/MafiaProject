﻿namespace MafiaProject.Core.Entityes
{
    public class Player
    {
        // хранит информацию после подключения в лобби и до окончания игры
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Position { get; set; }
        public string Role { get; set; }
        public bool IsReady { get; set; }
        public bool IsAlive { get; set; }
        public bool IsMafia { get; set; }

        public string ConnectionId { get; set; }
        public bool IsCameraOn { get; set; }
        public bool IsMicrophoneOn { get; set; }
    }
}
