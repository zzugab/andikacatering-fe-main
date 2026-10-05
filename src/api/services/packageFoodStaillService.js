import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Basic package operations
export const getDataFoodStall = async () => {
    try {
        const response = await axios.get(`${API_URL}/menu?type=Foodstall`, {
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

// Get all package stalls by UUID
export const getAllPackageStall = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/package/package-stall/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching package stalls for id ${uuid}:`, error);
        throw error;
    }
};

// Create a new package stall
export const createPackageStall = async (uuid, packageStallData) => {
    try {
        const response = await axios.post(`${API_URL}/package/package-stall/${uuid}`, packageStallData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating package stall:", error);
        throw error;
    }
};

// Update a package stall by UUID
export const updatePackageStall = async (uuid, packageStallData) => {
    try {
        const response = await axios.put(`${API_URL}/package/package-stall/${uuid}`, packageStallData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating package stall with id ${uuid}:`, error);
        throw error;
    }
};

// Delete a package stall by UUID
export const deletePackageStall = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/package/package-stall/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting package stall with id ${uuid}:`, error);
        throw error;
    }
};
