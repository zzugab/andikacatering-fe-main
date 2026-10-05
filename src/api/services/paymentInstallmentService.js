import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();


// Mengambil semua installment berdasarkan ID payment
export const getAllInstallments = async (paymentId) => {

  try {
    const response = await axios.get(`${API_URL}/payment/installment/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching installments:', error);
    throw error;
  }
};

// Membuat installment baru untuk payment tertentu
export const createInstallment = async (paymentId, installmentData) => {

  try {
    const response = await axios.post(`${API_URL}/payment/installment/${paymentId}`, installmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating installment:', error);
    throw error;
  }
};

// Mengambil installment berdasarkan ID installment
export const getInstallmentById = async (installmentId) => {

  try {
    const response = await axios.get(`${API_URL}/payment/installment/detail/${installmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching installment with ID ${installmentId}:`, error);
    throw error;
  }
};

// Memperbarui installment berdasarkan ID installment
export const updateInstallment = async (installmentId, installmentData) => {

  try {
    const response = await axios.post(`${API_URL}/payment/installment/update/${installmentId}`, installmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating installment with ID ${installmentId}:`, error);
    throw error;
  }
};

// Menghapus installment berdasarkan ID installment
export const deleteInstallment = async (installmentId) => {

  try {
    const response = await axios.delete(`${API_URL}/payment/installment/${installmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting installment with ID ${installmentId}:`, error);
    throw error;
  }
};

export const printData = async (uuid) => {

  try {
    axios.get(`${API_URL}/payment/installment/detail/${uuid}/print`, {
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

