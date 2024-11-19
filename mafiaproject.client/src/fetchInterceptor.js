// fetchInterceptor.js
(function () {
    const originalFetch = window.fetch;

    // ������� ��� ��������� ������ �� cookies
    function getAccessToken() {
        const match = localStorage.getItem("accessToken");
        return match;
    }

    // ������� ��� ���������� ������
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

    // ������������� ��� �������
    window.fetch = async function (url, options = {}) {
        const accessToken = getAccessToken();

        // ���� ����� ����, ��������� ��� � ���������
        if (accessToken) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // ��������� ������
        let response = await originalFetch(url, options);

        // ���� ����� ����� (401 Unauthorized), ��������� ����� � ��������� ������
        if (response.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                options.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await originalFetch(url, options); // ��������� ������ � ����� �������
            }
        }

        return response;
    };
})();
