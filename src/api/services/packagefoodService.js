import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Basic package operations
export const getData = async () => {
    try {
        const response = await axios.get(`${API_URL}/package`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
};

export const getDataByType = async (typeMenu) => {
    try {
        const query = `?type=${typeMenu}`;
        const response = await axios.get(`${API_URL}/package${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
};

export const createPackage = async (packageListData) => {
    try {
        const response = await axios.post(`${API_URL}/package`, packageListData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating package:", error);
        throw error;
    }
};

export const getByIdPackage = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/package/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching package by id ${uuid}:`, error);
        throw error;
    }
};

export const updatePackage = async (uuid, packageListData) => {
    try {
        const response = await axios.put(`${API_URL}/package/${uuid}`, packageListData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating package with id ${uuid}:`, error);
        throw error;
    }
};

export const deletePackage = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/package/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting package with id ${uuid}:`, error);
        throw error;
    }
};
 
// Package data operations
export const getPackageData = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/package/package-data/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching package data for id ${uuid}:`, error);
        throw error;
    }
};

export const createPackageData = async (uuid, categories) => {
    try {
        const response = await axios.post(`${API_URL}/package/package-data/${uuid}`, { category: categories }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating package data:", error);
        throw error;
    }
};

export const updatePackageData = async (uuid, menu) => {
    try {
        const response = await axios.put(`${API_URL}/package/package-data/${uuid}`, { menu }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating package data with id ${uuid}:`, error);
        throw error;
    }
};

export const deletePackageData = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/package/package-data/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting package data with id ${uuid}:`, error);
        throw error;
    }
};
