import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getAllOrders = async ( month = '', year = '') => {
  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...(month && { month }),
        ...(year && { year })
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If 404 error occurs, we silently return null without logging it
      return null;
    } else {
      // For other errors, you can still log them if needed
      console.error(`Error fetching order with ID ${id}:`, error);
    }
  }
};


export const updateOrderPayment = async (id, paymentData) => {

  try {
    const response = await axios.put(`${API_URL}/payment/${id}`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order payment with ID ${id}:`, error);
    throw error;
  }
};

export const updateOrder = async (uuid, orderData) => {

  try {
    const response = await axios.put(`${API_URL}/order/${uuid}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id) => {

  try {
    const response = await axios.delete(`${API_URL}/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    throw error;
  }
};

export const printData = async (uuid) => {

  try {
    axios.get(`${API_URL}/order/${uuid}/print`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob' // <- WAJIB untuk PDF
    }).then(res => {
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank'); // browser akan render PDF
      // optional: setTimeout(() => URL.revokeObjectURL(fileURL), 60_000);
    }).catch(err => {
      console.error(err);
      alert('Gagal membuka PDF.');
    });
    
  } catch (error) {
    console.error(`Error printing installment with ID ${uuid}:`, error);
    throw error;
  }
};

export const printDataDapur = async (uuid) => {

  try {
    axios.get(`${API_URL}/order/${uuid}/print/dapur`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob' // <- WAJIB untuk PDF
    }).then(res => {
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank'); // browser akan render PDF
      // optional: setTimeout(() => URL.revokeObjectURL(fileURL), 60_000);
    }).catch(err => {
      console.error(err);
      alert('Gagal membuka PDF.');
    });
    
  } catch (error) {
    console.error(`Error printing installment with ID ${uuid}:`, error);
    throw error;
  }
};
