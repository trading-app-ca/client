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
  static apiRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}${url}`, {
        method,
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    });
  }

  static get(url) {
    return this.apiRequest('GET', url);
  }

  static post(url, data) {
    return this.apiRequest('POST', url, data);
  }

  static put(url, data) {
    return this.apiRequest('PUT', url, data);
  }

  static delete(url) {
    return this.apiRequest('DELETE', url);
  }
}

export default ApiMethods;
