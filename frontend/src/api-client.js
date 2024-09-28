import api from './api/axiosConfig'; // Import the configured Axios instance

// Function to add search term to the database
export const addSearchTerm = async (searchTerm) => {
    try {
        const response = await api.post('/api/saveSearchHistory', { searchTerm });
        return response.data;
    } catch (error) {
        console.error('Error saving search history:', error);
        throw error; 
    }
};

// Function to retrive search term from the database
export const fetchSearchHistories = async () => {
    try {
        const response = await api.get('/api/searchHistory');
        return response.data;
    } catch (error) {
        console.error('Error fetching search histories:', error);
        throw error;
    }
};