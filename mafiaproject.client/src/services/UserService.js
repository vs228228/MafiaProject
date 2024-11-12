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

    // async getUserById(id) {
    //     try {
    //         const response = await fetch(`${UserService.baseUrl}/${id}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user by ID');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }

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

    async tryAuthUser(email, password) {//+
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
            return await response.json();
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
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(id, username, email, photo = null) {
        const userUpdate = { id, username, email };
    
        const formData = new FormData();
        formData.append('userUpdate', JSON.stringify(userUpdate));
        if (photo) {
          formData.append('photo', photo);
        }
    
        return fetch(UserService.baseUrl, {
          method: 'PUT',
          body: formData,
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update user');
          }
        });
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