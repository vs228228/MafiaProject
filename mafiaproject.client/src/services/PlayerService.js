class PlayerService {
    static baseUrl = 'https://localhost:7081/api/Player';

    async getPlayerById(userId) {
        try {
            const response = await fetch(`${PlayerService.baseUrl}?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch player by ID');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllPlayers(gameId) {
        try {
            const response = await fetch(`${PlayerService.baseUrl}/getAll?gameId=${gameId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch all players');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async changeMicro(playerId, isMicrophoneOn) {
        try {
            const Id = playerId;
            const changeMicroDTO = { Id, isMicrophoneOn };
            const response = await fetch(`${PlayerService.baseUrl}/changeMicro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changeMicroDTO),
            });
            if (!response.ok) {
                throw new Error('Failed to change microphone state');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async changeReady(playerId, isReady) {
        try {
            const Id = playerId;
            const changeReadyDTO = { Id, isReady };
            const response = await fetch(`${PlayerService.baseUrl}/changeReady`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changeReadyDTO),
            });
            if (!response.ok) {
                throw new Error('Failed to change ready state');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async changeCamera(playerId, isCameraOn) {
        try {
            const Id = playerId;
            const changeVideoDTO = { Id, isCameraOn };
            const response = await fetch(`${PlayerService.baseUrl}/changeCamera`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changeVideoDTO),
            });
            if (!response.ok) {
                throw new Error('Failed to change camera state');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePlayer(playerId, isAlive) {
        try {
            const id = playerId
            const playerUpdateDTO = { id, isAlive }
            const response = await fetch(PlayerService.baseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerUpdateDTO),
            });
            if (!response.ok) {
                throw new Error('Failed to update player');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePlayer(playerId) {
        try {
            const response = await fetch(`${PlayerService.baseUrl}?playerId=${playerId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete player');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const playerServiceInstance = new PlayerService();
export default playerServiceInstance;
