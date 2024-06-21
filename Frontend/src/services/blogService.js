import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/blogs'; 

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getAllTags = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  };

