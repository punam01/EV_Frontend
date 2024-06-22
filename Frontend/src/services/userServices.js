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

export const registerUser = async (userDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/`, userDetails);
    console.log(response.data)
    return response.data; // Assuming response data has the structure { msg, user }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.msg || 'Failed to register user.');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error request:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
      throw new Error('Error in setting up the request.');
    }
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

  export const checkUserEligibilityForTestDrive = async (customId) => {
    try {
      const user = await getUserByCustomId(customId); 
      if (user.testdrive === false) {
        return { eligible: true, message: 'User is eligible for test drive' };
      } else {
        return { eligible: false, message: 'User is not eligible for test drive' };
      }
    } catch (error) {
      throw error;
    }
  };

  export const verifyUserDetails = async (firstName, lastName, email, phoneNumber) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/verify`, {
            firstName,
            lastName,
            email,
            phoneNumber
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};