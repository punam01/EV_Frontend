import axios from 'axios';

export const createPreBooking = async (bookingDetails) => {
  try {
    const response = await axios.post('/api/pre-bookings', bookingDetails);
    return response.data;
  } catch (error) {
    console.error('Error creating pre-booking:', error);
    throw error;
  }
};

export const getBookingHistory = async (userId) => {
  try {
    const response = await axios.get(`/api/pre-bookings/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking history:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.put(`/api/pre-bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};
