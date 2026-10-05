import axios from "axios";
import { API_URL } from "../../config/index";
import Swal from "sweetalert2";

import credentialsUser from "../utils/credentialsUser";

const token = credentialsUser.getTokenUser();
// Fitur getAllEvent
export const getAllEvent = async () => {
  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

export const getAllInventory = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all inventory:", error);
    throw error;
  }
};

// Fitur GetAllData
export const getAllData = async (uuid) => {
  try {
    const response = await axios.get(`${API_URL}/order/item/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for event with id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Create
export const createItem = async (uuid, items) => {
  try {
    const response = await axios.post(`${API_URL}/order/item/${uuid}`, items, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating items:", error);
    throw error;
  }
};

// Fitur Update
export const updateItem = async (uuid, items) => {
  try {
    const response = await axios.put(`${API_URL}/order/item/${uuid}`, items, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating items for event with id ${uuid}:`, error);
    throw error;
  }
};

// Fitur Delete
export const deleteItem = async (uuid) => {
  try {
    const response = await axios.delete(`${API_URL}/order/item/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with id ${uuid}:`, error);
    throw error;
  }
};

export const getInventoryEventPrint = async (uuid) => {
  try {
    const res = await axios.get(`${API_URL}/order/item/${uuid}/print`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
      validateStatus: () => true, // jangan auto-reject untuk 4xx/5xx
    });

    // Cek status dan konten
    const isOk = res.status === 200;
    const isPdf = res.headers?.["content-type"]?.includes("application/pdf");
    const blob = res.data; // ini sudah Blob

    if (!isOk || !isPdf || !blob || blob.size === 0) {
      // Coba ambil pesan error dari blob (jika JSON/teks)
      let message = "Data kosong atau gagal membuka PDF.";
      Swal.fire("Failed", message, "error");
      return { ok: false, status: res.status };
    }

    // Sukses -> buka PDF
    const fileURL = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    window.open(fileURL, "_blank");
    setTimeout(() => URL.revokeObjectURL(fileURL), 60_000);

    return { ok: true, status: res.status };
  } catch (err) {
    // Ini hanya kena untuk network error (timeout, offline, DNS, dll)
    Swal.fire("Error", "Tidak bisa terhubung ke server.", "error");
    return { ok: false, status: 0, error: err };
  }
};

