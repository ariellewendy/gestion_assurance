// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';  
// const FRONT_URL = 'http://127.0.0.1:8000/api';  
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
});
// "Referer": FRONT_URL,

// Intercepteur pour injecter le token d'authentification dans les requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
