// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';  
 
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL =  API_URL;


// axios.interceptors.request.use(function (response) {
//   console.log('intercepted');
  
//   if (response?.data?.token) {
//   // if (localStorage.getItem("token")) {
//     localStorage.setItem('token', response.data.token);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

//   }
//   return response;
// }, function (error) {return Promise.reject(error);});

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
});


export default api;
