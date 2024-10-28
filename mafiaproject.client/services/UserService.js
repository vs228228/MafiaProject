class UserService {
    static baseUrl = 'https://localhost:7081/api/User';

  getUsers(pageNumber, pageSize) {
    return fetch(`${UserService.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      });
  }

  getUserById(id) {
    return fetch(`${UserService.baseUrl}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user by ID');
        }
        return response.json();
      });
  }

  getUserByEmail(email) {
    return fetch(`${UserService.baseUrl}/getByEmail/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user by email');
        }
        return response.json();
      });
  }

  getAllUsers() {
    return fetch(`${UserService.baseUrl}/getAll`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch all users');
        }
        return response.json();
      });
  }

  tryAddUser(username, email, password) {
    const user = { username, email, password };
    return fetch(UserService.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        return response.json();
      });
  }

  tryAuthUser(email, password) {
    const authDTO = { email, password };
    return fetch(`${UserService.baseUrl}/TryAuth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authDTO),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to authenticate user');
        }
        return response.json();
      });
  }

  refreshToken(token) {
    const refreshTokenDTO = { token };
    return fetch(`${UserService.baseUrl}/RefreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refreshTokenDTO),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }
        return response.json();
      });
  }

  updateUser(id, username, email, photo = null) {
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

  deleteUser(id) {
    return fetch(`${UserService.baseUrl}?id=${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    });
  }
}

export default new UserService();
