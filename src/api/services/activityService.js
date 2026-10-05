import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();
export const getAllActivities = async () => {
  try {
    const response = await axios.get(`${API_URL}/activity`, {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan Bearer token di header
      },
    });
    return response.data.data; // Hanya mengembalikan data aktivitas
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};
