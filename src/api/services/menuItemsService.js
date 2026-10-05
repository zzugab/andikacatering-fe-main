import axios from 'axios';
import { API_URL } from '../../config/index';
import credentialsUser from '../utils/credentialsUser';

const token = credentialsUser.getTokenUser();

// Mengambil semua menu berdasarkan ID order
export const getAllMenuItems = async (orderId) => {

  try {
    const response = await axios.get(`${API_URL}/order/menu/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};


export const createMenuItem = async (orderId, menuData) => {  

  try {
    const response = await axios.post(`${API_URL}/order/menu/update/${orderId}`, menuData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
};

export const listMenuItem = async (menuItemId, dataPakages) => {
try { 
  
    const response = await axios.post(`${API_URL}/order/menu/${menuItemId}/list-menu`, dataPakages,  {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
} catch (error) {
    console.error(`Error listing menu item with ID ${menuItemId}:`, error);
    throw error;
  }
  
};

export const AddMenuItem = async (menuItemId, dataPakages) => {
  try { 
    
      const response = await axios.post(`${API_URL}/order/menu/${menuItemId}/add-menu`, dataPakages,  {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
  } catch (error) {
      console.error(`Error listing menu item with ID ${menuItemId}:`, error);
      throw error;
    }
    
  };

  export const AddOrderAll = async (uuid, dataPakages) => {
    try { 
      
        const response = await axios.post(`${API_URL}/order/menu/update/${uuid}`, dataPakages,  {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data; 
    } catch (error) {
        console.error(`Error listing menu item with ID ${dataPakages}:`, error);
        throw error;
      }
      
    };





// Mengambil semua menu berdasarkan ID order
// export const getMenuItemsInPackage = async (uuid) => {

//   try {
//     const response = await axios.get(`${API_URL}/package/getDataMenuItemPackage/${uuid}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching menu items:', error);
//     throw error;
//   }
// };

// // Membuat item menu baru untuk order tertentu
// export const createMenuItem = async (orderId, menuData) => {

//   try {
//     const response = await axios.post(`${API_URL}/order/menu/${orderId}`, menuData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating menu item:', error);
//     throw error;
//   }
// };

// // Memperbarui item menu berdasarkan ID item menu
// export const updateMenuItem = async (menuItemId, menuData) => {

//   try {
//     const response = await axios.post(`${API_URL}/order/menu/update/${menuItemId}`, menuData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating menu item with ID ${menuItemId}:`, error);
//     throw error;
//   }
// };

// // Menghapus item menu berdasarkan ID item menu
// export const deleteMenuItem = async (menuItemId) => {

//   try {
//     const response = await axios.delete(`${API_URL}/order/menu/${menuItemId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting menu item with ID ${menuItemId}:`, error);
//     throw error;
//   }
// };
