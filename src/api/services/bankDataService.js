import axios from "axios";
import {
    API_URL
} from "../../config/index";

import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Fitur Create
export const createBankAccount = async (data) => {
    try {
        
        const response = await axios.post(
            `${API_URL}/bank`, 
                data,
             {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating bank account:", error);
        throw error;
    }
};

// Fitur GetAll
export const getAllBankAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/bank`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all bank accounts:", error);
        throw error;
    }
};
export const getBankAccountById = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/bank/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all bank accounts:", error);
        throw error;
    }
};

// Fitur Update
export const updateBankAccount = async (
    uuid, {
        name,
        account_number,
        account_owner
    }
) => {
    try {
        const response = await axios.put(
            `${API_URL}/bank/${uuid}`, {
                name,
                account_number,
                account_owner,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating bank account with id ${uuid}:`, error);
        throw error;
    }
};

// Fitur Delete
export const deleteBankAccount = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/bank/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting bank account with id ${uuid}:`, error);
        throw error;
    }
};