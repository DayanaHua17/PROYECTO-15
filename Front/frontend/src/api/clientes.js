// src/api/clientes.js 
import axios from "axios";

const API_URL = "http://18.230.216.176:8000/api/clientes/";

// Función para obtener los clientes
export const getClientes = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching clientes:", error);
    throw error;
  }
};

// Función para crear un cliente
export const createClient = async (token, clientData) => {
  try {
    const response = await axios.post(API_URL, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

// Función para actualizar un cliente
export const updateClient = async (token, clientId, clientData) => {
  try {
    const response = await axios.put(`${API_URL}${clientId}/`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

// Función para eliminar un cliente
export const deleteClient = async (token, clientId) => {
  try {
    const response = await axios.delete(`${API_URL}${clientId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};
