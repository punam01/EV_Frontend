import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getUserByCustomId = async (customId) => {
    console.log(customId)
    try {
        const response = await axios.get(`${API_BASE_URL}/user/get/${customId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (customId, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/update/${customId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
