import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Basic packageMain operations
export const getPackageMain = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/package/package-data/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching packageMain:", error);
        throw error;
    }
};

export const createPackageMain = async (uuid, packageMainData) => {
    try {
        const response = await axios.post(`${API_URL}/package/package-data/${uuid}`, packageMainData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating packageMain:", error);
        throw error;
    }
};


export const updatePackageMain = async (uuid, packageMainData) => {
    try {
        const response = await axios.put(`${API_URL}/package/package-data/${uuid}`, packageMainData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating packageMain with id ${uuid}:`, error);
        throw error;
    }
};

export const deletePackageMain = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/package/package-data/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting packageMain with id ${uuid}:`, error);
        throw error;
    }
};

// packageMain data operations
export const getPackageMainData = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/packageMain/package-data/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching packageMain data for id ${uuid}:`, error);
        throw error;
    }
};

export const createPackageMainData = async (uuid, categories) => {
    try {
        const response = await axios.post(`${API_URL}/packageMain/package-data/${uuid}`, { category: categories }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating packageMain data:", error);
        throw error;
    }
};

export const updatePackageMainData = async (uuid, menu) => {
    try {
        const response = await axios.put(`${API_URL}/packageMain/package-data/${uuid}`, { menu }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating packageMain data with id ${uuid}:`, error);
        throw error;
    }
};

export const deletePackageMainData = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/packageMain/package-data/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting packageMain data with id ${uuid}:`, error);
        throw error;
    }
};
