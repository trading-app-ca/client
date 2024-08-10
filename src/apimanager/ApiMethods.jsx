import store from '../redux/store';

const BASE_URL = 'https://crypto-trader-server.onrender.com/api/';

const getHeaders = () => {
  const state = store.getState();
  const token = state.auth?.token || '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

class ApiMethods {
    static async apiRequest(method, url, body = null) {
        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers: getHeaders(),
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API ${method} ${url} error:`, errorText);
                throw new Error(errorText);
            }

            const data = await response.json();
            console.log(`API ${method} ${url} response:`, data);
            return data;
        } catch (error) {
            console.error(`API ${method} ${url} failed:`, error);
            throw error;
        }
    }

    static post(url, data) {
        return this.apiRequest('POST', url, data);
    }

    static get(url) {
        return this.apiRequest('GET', url);
    }

    static put(url, data) {
        return this.apiRequest('PUT', url, data);
    }

    static delete(url) {
        return this.apiRequest('DELETE', url);
    }
}

export default ApiMethods;
