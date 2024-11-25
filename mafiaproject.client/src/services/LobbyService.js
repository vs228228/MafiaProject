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

    async updateLobby(lobbyUpdateDTO) { // ���� ����� ���� �� ��������
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

    async connectToLobby(userId, lobbyId) {
        const response = await fetch(`${LobbyService.baseUrl}/connectToLobby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lobbyId, userId })
        });
        if (!response.ok) throw new Error('Failed to connect to lobby');
    }

    async disconnectFromLobby(userId, lobbyId) {
        const response = await fetch(`${LobbyService.baseUrl}/disconnectToLobby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lobbyId, userId })
        });
        if (!response.ok) throw new Error('Failed to disconnect from lobby');
    }

    async createLobby({ creatorId, name, password }) {
        const lobbyCreateDTO = { creatorId, name, password };
    
        const response = await fetch(LobbyService.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lobbyCreateDTO)
        });
    
        console.log("Response status:", response.status); // Логируем статус ответа
        if (response.status === 204) {
            // console.log("Lobby created successfully, but no content returned.");
            return; 
        }
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error("Error response text:", errorText); 
        }
        // // Проверяем наличие тела ответа
        const text = await response.text();
        // console.log("Response from server:", text); // Логируем ответ от сервера
    
        if (!text) {
            throw new Error('Empty response from server');
        }
        return JSON.parse(text);
    }
    
    

    async deleteLobby(id) {
        const response = await fetch(`${LobbyService.baseUrl}?id=${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete lobby');
    }
}

const LobbyServiceInstance = new LobbyService();
export default LobbyServiceInstance;
