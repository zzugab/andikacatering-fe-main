import axios from 'axios';
import { API_URL } from '../../config';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getAllFinancialRecords = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/order/record/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching financial records:', error);
    throw error;
  }
};

export const createFinancialRecord = async (id, recordData) => {

  try {
    const response = await axios.post(`${API_URL}/order/record/${id}`, recordData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating financial record:', error);
    throw error;
  }
};

export const getFinancialRecordById = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/order/record/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching financial record with ID ${id}:`, error);
    throw error;
  }
};

export const updateFinancialRecord = async (id, recordData) => {

  try {
    const response = await axios.post(`${API_URL}/order/record/update/${id}`, recordData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating financial record with ID ${id}:`, error);
    throw error;
  }
};

export const deleteFinancialRecord = async (id) => {

  try {
    const response = await axios.delete(`${API_URL}/order/record/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting financial record with ID ${id}:`, error);
    throw error;
  }
};
