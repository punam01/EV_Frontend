import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 
export const bookCar = async (bookingData) => {
  console.log("booking data",bookingData)
  try {
    const response = await axios.post(`${API_BASE_URL}/api/pre-bookings`, bookingData);
    return response.data;
  } catch (error) {
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
    const response = await axios.get(`${API_BASE_URL}/bookings/history/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
