import axios from 'axios';
import {
    API_URL
} from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();


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

// Fitur untuk mendapatkan semua resep
export const getAllRecipes = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/menu/recipe/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching all recipes:", error);
        throw error;
    }
};

// Fitur untuk membuat resep
export const createRecipe = async (uuid, recipeData) => {
    try {
        const response = await axios.post(`${API_URL}/menu/recipe/${uuid}`, {
            data: recipeData
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};

// Fitur untuk memperbarui resep
export const updateRecipe = async (uuid, recipes) => {
    try {
        const response = await axios.post(`${API_URL}/menu/recipe/${uuid}`, {
            recipes
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating recipes for uuid ${uuid}:`, error);
        throw error;
    }
};

// Fitur untuk menghapus resep
export const deleteRecipe = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/menu/recipe/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting recipe with uuid ${uuid}:`, error);
        throw error;
    }
};