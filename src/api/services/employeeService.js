import axios from 'axios';
import { API_URL } from '../../config/index';

import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getAllEmployee = async () => {

  try {
    const response = await axios.get(`${API_URL}/employee`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {

  try {
    const response = await axios.post(`${API_URL}/employee`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const employeeById = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching employee by id:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {

  try {
    const response = await axios.put(`${API_URL}/employee/${id}`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const updatePassword = async (id, passwordData) => {

  try {
    const response = await axios.put(`${API_URL}/employee/${id}/password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const updateRole = async (id, roleId) => {

  try {
    const response = await axios.put(`${API_URL}/employee/${id}/role`, roleId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

export const accountActivation = async (id) => {

  try {
    const response = await axios.put(
      `${API_URL}/employee/${id}/reactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error activating account:', error);
    throw error;
  }
};

export const accountSuspend = async (id) => {

  try {
    const response = await axios.put(
      `${API_URL}/employee/${id}/suspend`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error suspending account:', error);
    throw error;
  }
};

export const getRoles = async () => {

  try {
    const response = await axios.get(`${API_URL}/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const getRoleById = async (id) => {

  try {
    const response = await axios.get(`${API_URL}/role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching role by id:', error);
    throw error;
  }
};
