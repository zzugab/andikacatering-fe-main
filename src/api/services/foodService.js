import axios from 'axios';
import {
    API_URL
} from '../../config/index';

import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Fitur untuk kategori
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/menu/category`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const createCategory = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/menu/category`, {
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const getCategoryById = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/menu/category/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching category with uuid ${uuid}:`, error);
        throw error;
    }
};

export const updateCategory = async (uuid, name) => {
    try {
        const response = await axios.put(`${API_URL}/menu/category/${uuid}`, {
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating category with uuid ${uuid}:`, error);
        throw error;
    }
};

export const deleteCategory = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/menu/category/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting category with uuid ${uuid}:`, error);
        throw error;
    }
};

// Fitur untuk menu
export const getMenus = async () => {
    try {
        const response = await axios.get(`${API_URL}/menu`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
};

export const getMenusType = async (typeMenu) => {
    try {
        const query = `?type=${typeMenu}`;
        const response = await axios.get(`${API_URL}/menu${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
};


export const getMenuById = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/menu/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching menu with uuid ${uuid}:`, error);
        throw error;
    }
};
// foodService.js
export const createMenu = async (menu) => {
    try {
        const response = await axios.post(`${API_URL}/menu`, menu, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating menu:", error);
        throw error;
    }
};

export const updateMenu = async (uuid, menuData) => {
    try {
        const response = await axios.post(`${API_URL}/menu/${uuid}`, menuData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating menu with uuid ${uuid}:`, error);
        throw error;
    }
};


export const deleteMenu = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/menu/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting menu with uuid ${uuid}:`, error);
        throw error;
    }
};