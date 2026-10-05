import { decryptRSAWithSalt } from '../utils/en_den';

const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
const storedName = localStorage.getItem('name') || sessionStorage.getItem('name');
const storedRole = localStorage.getItem('role') || sessionStorage.getItem('role');

// Dekripsi token jika tersedia
const token = storedToken ? decryptRSAWithSalt(storedToken) : null;
const name = storedName ? decryptRSAWithSalt(storedName) : null;
const role = storedRole ? decryptRSAWithSalt(storedRole) : null;

export default {
  getTokenUser() {
    return token;
  },
  getNameUser() {
    return name;
  },
  getRoleUser() {
    return role;
  },
  
  clearCredentialUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('role');
  }
};
