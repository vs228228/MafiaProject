class UserService {
    static baseUrl = 'https://localhost:7081/api/User';

    async getUsers(pageNumber, pageSize) {
        try {
            const response = await fetch(`${UserService.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error; // ������������� ���������� ������ ������
        }
    }

    async getUserById(id) {
        try {
            const response = await fetch(`${UserService.baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user by ID');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const response = await fetch(`${UserService.baseUrl}/getByEmail/${email}`,
                {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }, 
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch user by email');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllUsers() {
        const response = await fetch(`${UserService.baseUrl}/getAll`);
        if (!response.ok) {
            throw new Error('Failed to fetch all users');
        }
        return await response.json();
    }

    async tryAddUser(nick, email, password) {//+
        const user = { nick, email, password };
        try {
            const response = await fetch(UserService.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            return await "Ok";
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async tryAuthUser(email, password) {
        const authDTO = { email, password };
        try {
            const response = await fetch(`${UserService.baseUrl}/TryAuth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authDTO),
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate user');
            }

            const data = await response.json();


            document.cookie = `access_token=${data.accessToken};Expires=${new Date(Date.now() + 30 * 60000).toUTCString()}`;
            document.cookie = `refresh_token=${data.refreshToken}; Expires=${new Date(Date.now() + 7 * 24 * 60 * 60000).toUTCString()}`;
            

            return "Ok";
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async refreshToken(token) {
        const refreshTokenDTO = { token };
        try {
            const response = await fetch(`${UserService.baseUrl}/RefreshToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(refreshTokenDTO),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);

            // Сохраняем новый access_token из заголовков в куки
            const newAccessToken = response.headers.get('access_token');
            if (newAccessToken) {
                document.cookie = `access_token=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(Date.now() + 30 * 60000).toUTCString()}`;
            }

            return "Ok";
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(id, nick, photo ) { // при редактированнии
        const formData = new FormData();
        formData.append('Id', id);
        formData.append('Nick', nick);
        if (photo instanceof File) {
            formData.append('photo', photo);
           
        }

        try {
            const response = await fetch(UserService.baseUrl, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(id) {//+
        try {
            const response = await fetch(`${UserService.baseUrl}?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const userServiceInstance = new UserService();
export default userServiceInstance;