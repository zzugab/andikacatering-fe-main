import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getAllCustomer = async () => {

  try {
    const response = await axios.get(`${API_URL}/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const createCustomer = async (CustomerData) => {

  try {
    const response = await axios.post(`${API_URL}/customer`, CustomerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
};

export const updateCustomer = async (id, CustomerData) => {

  try {
    const response = await axios.put(`${API_URL}/customer/${id}`, CustomerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {

  try {
    const response = await axios.delete(`${API_URL}/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
};

export const searchCustomer = async (name) => {
  try {
    const response = await axios.get(
      `${API_URL}/customer/search/${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error searching customers:', error);
    throw error;
  }
};
