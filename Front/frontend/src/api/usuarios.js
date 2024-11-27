// src/api/usuarios.js
import axios from "axios";

// URL base de la API
const API_URL = "http://18.230.216.176:8000/api/";

// Función para obtener usuarios
export const getUsuarios = async (token) => {
  try {
    const response = await axios.get(`${API_URL}usuarios/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    throw error;
  }
};

// Función para crear un usuario
export const createUsuario = async (token, usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}usuarios/`, usuarioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating usuario:", error);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUsuario = async (token, usuarioId, usuarioData) => {
  try {
    const response = await axios.put(`${API_URL}usuarios/${usuarioId}/`, usuarioData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating usuario:", error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUsuario = async (token, usuarioId) => {
  try {
    const response = await axios.delete(`${API_URL}usuarios/${usuarioId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting usuario:", error);
    throw error;
  }
};
