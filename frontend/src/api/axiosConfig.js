import axios from 'axios';

const api = axios.create({
    baseURL: 'https://multisearch-u5zz.onrender.com/',
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;