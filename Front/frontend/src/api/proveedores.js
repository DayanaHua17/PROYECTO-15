// src/api/proveedores.js 
import axios from "axios";

const API_URL = "http://18.230.216.176:8000/api/proveedores/";

// Función para obtener los proveedores
export const getProveedores = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching proveedores:", error);
    throw error;
  }
};

// Función para crear un proveedor
export const createProveedor = async (token, proveedorData) => {
  try {
    const response = await axios.post(API_URL, proveedorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating proveedor:", error);
    throw error;
  }
};

// Función para actualizar un proveedor
export const updateProveedor = async (token, proveedorId, proveedorData) => {
  try {
    const response = await axios.put(`${API_URL}${proveedorId}/`, proveedorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating proveedor:", error);
    throw error;
  }
};

// Función para eliminar un proveedor
export const deleteProveedor = async (token, proveedorId) => {
  try {
    const response = await axios.delete(`${API_URL}${proveedorId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting proveedor:", error);
    throw error;
  }
};
