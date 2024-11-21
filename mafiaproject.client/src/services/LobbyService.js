class LobbyService {
    static baseUrl = 'https://localhost:7081/api/Lobby';

    async getPaginatedLobbies(pageNumber, pageSize) {
        const response = await fetch(`${LobbyService.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        if (!response.ok) throw new Error('Failed to fetch paginated lobbies');
        return await response.json();
    }

    async getLobbyById(id) {
        const response = await fetch(`${LobbyService.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch lobby by ID');
        return await response.json();
    }

    async getAllLobbies() {
        const response = await fetch(`${LobbyService.baseUrl}/getAll`);
        if (!response.ok) throw new Error('Failed to fetch all lobbies');
        return await response.json();
    }

    async getAllPlayers(lobbyId) {
        const response = await fetch(`${LobbyService.baseUrl}/getAllPlayers?lobbyId=${lobbyId}`);
        if (!response.ok) throw new Error('Failed to fetch all players in lobby');
        return await response.json();
    }

    async updateLobby(lobbyUpdateDTO) { // этот метод пока не трогайте
        const response = await fetch(`${LobbyService.baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lobbyUpdateDTO)
        });
        if (!response.ok) throw new Error('Failed to update lobby');
    }

    async startGame(lobbyId) {
        const response = await fetch(`${LobbyService.baseUrl}/startGame?lobbyId=${lobbyId}`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to start game');
    }

    async connectToLobby(lobbyId, userId) {
        const response = await fetch(`${LobbyService.baseUrl}/connectToLobby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lobbyId, userId })
        });
        if (!response.ok) throw new Error('Failed to connect to lobby');
    }

    async disconnectFromLobby(lobbyId, playerId) {
        const response = await fetch(`${LobbyService.baseUrl}/disconnectToLobby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lobbyId, playerId })
        });
        if (!response.ok) throw new Error('Failed to disconnect from lobby');
    }

    async createLobby(creatorId, name, password) { // пассворд можешь нулл передавать, если его нет
        const lobbyCreateDTO = { creatorId, name, password }
        const response = await fetch(`${LobbyService.baseUrl}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lobbyCreateDTO)
        });
        if (!response.ok) throw new Error('Failed to create lobby');
        return await response.json();
    }

    async deleteLobby(id) {
        const response = await fetch(`${LobbyService.baseUrl}?id=${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete lobby');
    }
}

const LobbyServiceInstance = new LobbyService();
export default LobbyServiceInstance;
