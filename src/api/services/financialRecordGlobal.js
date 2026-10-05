import axios from 'axios';
import { API_URL } from '../../config/index'; // Sesuaikan dengan konfigurasi API Anda
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();
export const getFinancialRecord = async (filters = {}) => {
    try {
        const { type ='', date_start = '', date_end = ''} = filters;
        const query = `?date_start=${date_start}&date_end=${date_end}&type=${type}`;
        const response = await axios.get(`${API_URL}/financialRecord${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getIncomeDetail = async (uuid) =>{
    try {
        const response = await axios.get(`${API_URL}/financialRecord/income/${uuid}`, {
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

export const getOutcomeDetail = async (uuid) =>{
    try {
        const response = await axios.get(`${API_URL}/financialRecord/outcome/${uuid}`, {
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

