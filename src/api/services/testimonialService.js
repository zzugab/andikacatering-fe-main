import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();


// Fitur GetAllData
export const getAllTestimonials = async () => {
    try {
        const response = await axios.get(`${API_URL}/testimonial`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all testimonials:", error);
        throw error;
    }
};

export const getAllCustomer = async () => {
    try {
        const response = await axios.get(`${API_URL}/customer`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all testimonials:", error);
        throw error;
    }
};


// Fitur Create
export const createTestimonial = async (customer_id, rating, testimonial) => {
    try {
        const response = await axios.post(`${API_URL}/testimonial`, { customer_id, rating, testimonial }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating testimonial:", error);
        throw error;
    }
};

// Fitur GetById
export const getTestimonialById = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/testimonial/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching testimonial by id ${uuid}:`, error);
        throw error;
    }
};

// Fitur Update
export const updateTestimonial = async (uuid, customer_id, rating, testimonial) => {
    try {
        const response = await axios.put(`${API_URL}/testimonial/${uuid}`, { customer_id, rating, testimonial }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating testimonial with id ${uuid}:`, error);
        throw error;
    }
};

// Fitur Create from User
export const createTestimonialFromUser = async (rating, testimonial) => {
    try {
        const response = await axios.post(`${API_URL}/testimonial/customer/`, { rating, testimonial }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating testimonial by user:", error);
        throw error;
    }
};

// Fitur Delete
export const deleteTestimonial = async (uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/testimonial/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting testimonial with id ${uuid}:`, error);
        throw error;
    }
};
