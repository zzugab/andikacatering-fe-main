import axios from 'axios';
import { API_URL } from '../../config/index'; // Sesuaikan dengan konfigurasi API Anda
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Fitur GetAllData dengan filter opsional
export const getAllMeetingSchedules = async (filters = {}) => {
    try {
        const { title = '', event_date_start = '', status = '', location = '' } = filters;
        const query = `?title=${title}&event_date_start=${event_date_start}&status=${status}&location=${location}`;
        const response = await axios.get(`${API_URL}/meeting-schedule${query}`, {
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

// Fitur create meeting schedule
export const createMeetingSchedule = async (scheduleData) => {
    try {
        const response = await axios.post(`${API_URL}/meeting-schedule`, scheduleData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating meeting schedule:", error);
        throw error;
    }
};

// Fitur getById untuk mendapatkan jadwal pertemuan berdasarkan UUID
export const getMeetingScheduleById = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/meeting-schedule/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching meeting schedule with uuid ${uuid}:`, error);
        throw error;
    }
};

// Fitur update meeting schedule berdasarkan UUID
export const updateMeetingSchedule = async (uuid, scheduleData) => {
    try {
        const response = await axios.put(`${API_URL}/meeting-schedule/${uuid}`, scheduleData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating meeting schedule with uuid ${uuid}:`, error);
        throw error;
    }
};

// Fitur delete meeting schedule berdasarkan UUID
export const deleteMeetingSchedule = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/meeting-schedule/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting meeting schedule with uuid ${uuid}:`, error);
        throw error;
    }
};
