import axios from 'axios';
import { API_URL } from '../../config/index';
import { encryptRSAWithSalt } from '../utils/en_den';
import CredentialUser from '../utils/credentialsUser'

export const loginUser = async (userData) => {
  try {
    const datalogin = {
      namemail: userData.namemail,
      password: userData.password
    };

    const response = await axios.post(`${API_URL}/login`, datalogin);

    if (response.data.data.access_token) {
      if (userData.remember === true) {
        localStorage.setItem('token', encryptRSAWithSalt(response.data.data.access_token));
        localStorage.setItem('role', encryptRSAWithSalt(response.data.data.user.role.name));
        localStorage.setItem('name', encryptRSAWithSalt(response.data.data.user.name));
      } else {
        sessionStorage.setItem('token', encryptRSAWithSalt(response.data.data.access_token));
        sessionStorage.setItem('role', encryptRSAWithSalt(response.data.data.user.role.name));
        sessionStorage.setItem('name', encryptRSAWithSalt(response.data.data.user.name));
      }
    }
    
    return response.data;
  } catch (error) {
    // Tangani error agar tidak muncul di console
    const msg = error.response?.data?.errors || "Login gagal. Periksa kembali kredensial Anda.";
    return { error: true, message: msg };
  }
};

export const logoutUser = () => {
  try {
    CredentialUser.clearCredentialUser();
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Error occurred during logout');
  }
};