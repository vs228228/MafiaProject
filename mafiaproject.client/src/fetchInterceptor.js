// fetchInterceptor.js
(function () {
    const originalFetch = window.fetch;

    // Функция для получения токена из cookies

    function getCookie(name) {
        const cookies = document.cookie.split('; '); 
        const cookie = cookies.find(c => c.startsWith(name + '=')); 
        return cookie ? cookie.split('=')[1] : null; 
    }

    // Функция для обновления токена
    async function refreshAccessToken() {
        const refreshToken = getCookie("refresh_token")
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

            const data = await response.json();
                document.cookie = `access_token=${data.token}; Expires=${new Date(Date.now() + 30 * 60000).toUTCString()}`;

            return data.token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Перехватываем все запросы
    window.fetch = async function (url, options = {}) {
        const accessToken = getCookie("access_token");
        console.log(accessToken)

        // Если токен есть, добавляем его в заголовки
        if (accessToken) {
            options.headers = options.headers || {};
            options.headers['authorization'] = `Bearer ${accessToken}`;
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
