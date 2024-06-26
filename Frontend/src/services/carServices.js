import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getAllCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/car`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/car/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    throw error;
  }
};

export const getAllVariants = async (modelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/car/variants/${modelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching variants:", error);
    throw error;
  }
};

export const getDesiredVariant = async (queryParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/car/variant`, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("Error fetching desired variant:", error);
    throw error;
  }
};

export const compareCars = async (model1,model2) => {
  try {
    const response = await axios.get('http://localhost:5000/api/car/compare', {
      params: { model1, model2 }
    });
    return response.data;
    
  } catch (err) {
    console.log(err)
  }
};
