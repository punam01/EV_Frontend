import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getCarAvailabilityByPincode = async (pincode) => {
    try {
        const response = await fetch(`${API_BASE_URL}/location/availability?pincode=${pincode}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Failed to fetch data');
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching car availability:', error.message);
        throw error;
    }
};

export const updateTimeSlot = async (locationId, carModel, timeSlot, action) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/location`, {
            locationId,
            carModel,
            timeSlot,
            action
        });
        return response.data;
    } catch (error) {
        console.error('Error updating time slot:', error);
        throw error;
    }
};

export const removeDateTimeFromAvailability = async (locationId, carModel, dateTimeToRemove) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/location/updateAvailability`, {
            locationId: locationId,
            carModel: carModel,
            dateTimeToRemove: dateTimeToRemove
        });

        return response.data.success; // Assuming your backend returns { success: true } upon successful update
    } catch (error) {
        console.error('Error updating availability:', error.message);
        throw error;
    }
};