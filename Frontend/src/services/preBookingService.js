import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/prebooking'; 
export const bookCar = async (bookingData) => {
  try {
      const response = await axios.post(`${API_BASE_URL}`, bookingData);
      console.log("BOOKcar ",response.data);
      return response.data;
  } catch (error) {
      console.error('Error booking car:', error);
      throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingHistory = async (userId) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/history/${userId}`);
      return response.data;
  } catch (error) {
      throw new Error('Error fetching booking history');
  }
};
