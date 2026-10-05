import axios from 'axios';
import {
    API_URL
} from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();


export const getPurchasePlan = async (uuid) => {
    try {
        const response = await axios.get(`${API_URL}/order/purchasePlan/${uuid}`, {
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
export const getPurchasePlanPrint = async (uuid) => {

    try {
        axios.get(`${API_URL}/order/purchasePlan/${uuid}/print`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // <- WAJIB untuk PDF
      }).then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank'); // browser akan render PDF
        // optional: setTimeout(() => URL.revokeObjectURL(fileURL), 60_000);
      }).catch(err => {
        console.error(err);
        alert('Gagal membuka PDF.');
      });
      
    } catch (error) {
      console.error(`Error printing installment with ID ${uuid}:`, error);
      throw error;
    }
  };
  

