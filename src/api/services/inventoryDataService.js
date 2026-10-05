import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Fitur Create Inventory
export const createInventory = async (dataInventory) => {
  try {
    const response = await axios.post(`${API_URL}/inventory`, dataInventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating inventory:', error);
    throw error;
  }
};

// Fitur GetAll
export const getAllInventory = async (filter) => {
  try {
    const response = await axios.get(`${API_URL}/inventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all inventory:', error);
    throw error;
  }
};

// Fitur GetById
export const getInventoryById = async (uuid) => {
  try {
    const response = await axios.get(`${API_URL}/inventory/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching inventory by id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Update
export const updateInventory = async (uuid, dataInventory) => {
  try {
    const response = await axios.put(`${API_URL}/inventory/${uuid}`, dataInventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory with id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Delete
export const deleteInventory = async (uuid) => {
  try {
    const response = await axios.delete(`${API_URL}/inventory/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting inventory with id ${uuid}:`, error);
    throw error;
  }
};
