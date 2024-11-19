// fetchInterceptor.js
(function () {
    const originalFetch = window.fetch;

    // Функция для получения токена из cookies
    function getAccessToken() {
        const match = localStorage.getItem("accessToken");
        return match;
    }

    // Функция для обновления токена
    async function refreshAccessToken() {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        try {
            const response = await fetch('https://localhost:7081/api/User/RefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const newAccessToken = response.headers.get('access_token');
            if (newAccessToken) {
                document.cookie = `access_token=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(Date.now() + 30 * 60000).toUTCString()}`;
            }
            return newAccessToken;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Перехватываем все запросы
    window.fetch = async function (url, options = {}) {
        const accessToken = getAccessToken();

        // Если токен есть, добавляем его в заголовки
        if (accessToken) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Выполняем запрос
        let response = await originalFetch(url, options);

        // Если токен истек (401 Unauthorized), обновляем токен и повторяем запрос
        if (response.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                options.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await originalFetch(url, options); // повторяем запрос с новым токеном
            }
        }

        return response;
    };
})();
