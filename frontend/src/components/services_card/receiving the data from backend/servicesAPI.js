// servicesAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/services";

export const fetchServices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching services", error);
    return [];
  }
};

export const deleteService = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting service", error);
  }
};

export const addService = async (formData) => {
  try {
    await axios.post(BASE_URL, formData);
  } catch (error) {
    console.error("Error uploading service", error);
  }
};
