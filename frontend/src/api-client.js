import api from './api/axiosConfig'; // Import the configured Axios instance

// Function to add search term to the database
export const addSearchTerm = async (searchTerm) => {
    try {
        const response = await api.post('/api/saveSearchHistory', { searchTerm });
        return response.data;  // Return the response from the server
    } catch (error) {
        console.error('Error saving search history:', error);
        throw error;  // Throw error to handle it in the component if needed
    }
};
