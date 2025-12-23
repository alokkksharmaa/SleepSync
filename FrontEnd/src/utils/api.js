import axios from 'axios';

// Use proxy in dev (relative URL) or direct URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:5000/api');

console.log('API Base URL configured as:', API_BASE_URL);
console.log('Environment:', import.meta.env.DEV ? 'development (using proxy)' : 'production');

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      console.error('CORS/Network Error:', error.message);
      console.error('Request URL:', error.config?.url);
      console.error('Base URL:', error.config?.baseURL);
      console.error('Full URL would be:', error.config?.baseURL + error.config?.url);
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
