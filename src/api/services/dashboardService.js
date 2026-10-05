import axios from 'axios';
import { API_URL } from '../../config/index'; // Sesuaikan dengan konfigurasi API Anda
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getDashboardSuperAdmin = async (filters = {}) => {
    try {
        const { event_date_start = '', event_date_end = '' } = filters;
        const query = `?event_date_start=${event_date_start}&event_date_end=${event_date_end}`;
        const response = await axios.get(`${API_URL}/dashboard${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching meeting schedules:", error);
        throw error;
    }
};

export const getDashboardAdmin = async (filters = {}) => {
    try {
        const { event_date_start = '', event_date_end = '' } = filters;
        const query = `?event_date_start=${event_date_start}&event_date_end=${event_date_end}`;
        const response = await axios.get(`${API_URL}/dashboardAdmin${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching meeting schedules:", error);
        throw error;
    }
};

export const getDataUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

