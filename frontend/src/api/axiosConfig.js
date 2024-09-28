import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;