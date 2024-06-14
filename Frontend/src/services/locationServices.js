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