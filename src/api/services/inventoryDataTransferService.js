import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getAllEvent = async () => {
  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};

// Fitur GetAllData
export const getAllData = async () => {
  try {
    const response = await axios.get(`${API_URL}/transfer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all transfers:', error);
    throw error;
  }
};

// Fitur Create
export const createTransfer = async (dataTransfer) => {
  try {
    const response = await axios.post(`${API_URL}/transfer`, dataTransfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating transfer:', error);
    throw error;
  }
};

// Fitur GetById
export const getTransferById = async (uuid) => {
  try {
    const response = await axios.get(`${API_URL}/transfer/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching transfer by id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Update
export const updateTransfer = async (uuid, dataTransfer) => {
  try {
    const response = await axios.put(`${API_URL}/transfer/${uuid}`, dataTransfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating transfer with id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Request
export const requestTransfer = async (uuid, requestData) => {
  try {
    const response = await axios.post(`${API_URL}/requestTransfer/${uuid}`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error requesting transfer with id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Delete
export const deleteTransfer = async (uuid) => {
  try {
    const response = await axios.delete(`${API_URL}/transfer/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting transfer with id ${uuid}:`, error);
    throw error;
  }
};
