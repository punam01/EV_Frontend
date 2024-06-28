import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/demoBook'; 

export const createDemoBooking = async (userId, locationId, modelName, bookingTime, contact) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, {
            userId,
            locationId,
            modelName,
            bookingTime,
            contact
        });
        return response.data;
    } catch (error) {
        console.error('Error creating demo booking:', error);
        throw error;
    }
};

export const fetchUserHistory = async (userId) => {
    console.log("userid",userId)
    try {
        const response = await axios.post(`${API_BASE_URL}/history`, { userId }); 
        return response.data;
    } catch (error) {
        console.error('Error fetching user history:', error);
        throw error;
    }
};

export const cancelBooking = async (bookId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cancel-booking`, { bookId });
        return response.data;
    } catch (error) {
        console.error('Error cancelling booking:', error);
        throw error; 
    }
};