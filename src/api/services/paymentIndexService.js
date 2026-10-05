import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Mengambil semua pembayaran berdasarkan ID order
export const getAllPayments = async () => {

  try {
    const response = await axios.get(`${API_URL}/payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

// Mengambil pembayaran berdasarkan ID pembayaran
export const getPaymentById = async (paymentId) => {

  try {
    const response = await axios.get(`${API_URL}/payment/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching payment with ID ${paymentId}:`, error);
    throw error;
  }
};

// Memperbarui pembayaran berdasarkan ID pembayaran
export const updatePayment = async (paymentId, paymentData) => {

  try {
    const response = await axios.put(`${API_URL}/payment/${paymentId}`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating payment with ID ${paymentId}:`, error);
    throw error;
  }
};

// Menghapus pembayaran berdasarkan ID pembayaran
export const deletePayment = async (paymentId) => {

  try {
    const response = await axios.delete(`${API_URL}/payment/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting payment with ID ${paymentId}:`, error);
    throw error;
  }
};
