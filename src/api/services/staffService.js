import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getAllStaff = async () => {

  try {
    const response = await axios.get(`${API_URL}/staff`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

export const createStaff = async (staffData) => {

  try {
    const response = await axios.post(`${API_URL}/staff`, staffData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating staff:', error);
    throw error;
  }
};

export const staffById = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching staff by id:', error);
    throw error;
  }
};

export const updateStaff = async (id, staffData) => {

  try {
    const response = await axios.put(`${API_URL}/staff/${id}`, staffData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

export const deleteStaff = async (id) => {

  try {
    const response = await axios.delete(`${API_URL}/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};
