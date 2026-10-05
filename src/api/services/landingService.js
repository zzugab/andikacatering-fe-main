import axios from 'axios';
import { API_URL } from '../../config/index'; // Sesuaikan dengan konfigurasi API Anda

export const getAllData = async () => {
    try {
        const response = await axios.get(`${API_URL}/landingPage?package_limit:=3&menu_limit=4&foodstall_limit=4&testimoni_limit=6`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all Landing:", error);
        throw error;
    }
};
