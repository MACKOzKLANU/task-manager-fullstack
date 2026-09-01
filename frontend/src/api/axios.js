import axios from 'axios';
import logoutRef from '../helpers/logout';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token invalid/expired - call handleLogout stored earlier
            // by Navbar (clears user + token, then redirects).
            logoutRef.logout();
        }
        return Promise.reject(error); // error still bubbles up to the component's catch
    }
)

export default api;