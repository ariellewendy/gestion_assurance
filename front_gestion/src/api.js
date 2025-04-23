// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';  

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL =  API_URL;

if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

// axios.interceptors.request.use(response => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
//     }
// });

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
});

// Intercepteur pour injecter le token d'authentification dans les requêtes
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
