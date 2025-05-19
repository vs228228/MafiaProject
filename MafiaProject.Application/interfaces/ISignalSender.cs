using System.Threading.Tasks;

namespace MafiaProject.Application.Interfaces
{
    public interface ISignalSender
    {
        Task StartGame(string lobbyName);
        Task EndGame(string lobbyName);
        Task SendMessageToAll(string lobbyName, string message, string name);
        Task SendPersonalMessage(int playerId, string message, string name);
        Task ToggleMicrophone(int playerId, bool enabled);
        Task ToggleCamera(int playerId, bool enabled);
        Task SetMafiaVisibility(string lobbyName, bool enabled);
        Task NotifyPlayerDeath(string lobbyName, int playerId);
        Task NotifyLobbyUpdate(string lobbyName);
        Task SendWebRTCSignal(int playerId, string signal);
    }
}
