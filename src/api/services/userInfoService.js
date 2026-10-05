import axios from 'axios';
import { API_URL } from '../../config';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

export const getUserInfo = async () => {

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const getUserRole = async () => {
  try {
    const response = await getUserInfo();
    return response.role.name;
  } catch (error) {
    console.log('Error fetching user role:', error);
  }
};

export const getUserName = async () => {
  try {
    const response = await getUserInfo();
    return response.name;
  } catch (error) {
    console.log('Error fetching user name:', error);
  }
};

export const getUserEmail = async () => {
  try {
    const response = await getUserInfo();
    return response.email;
  } catch (error) {
    console.log('Error fetching user email:', error);
  }
};

export const updateUserProfile = async (user) => {

  try {
    await axios.put(`${API_URL}/user`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
