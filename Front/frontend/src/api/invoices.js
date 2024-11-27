import axios from "axios";

// La URL de la API (asegúrate de que apunte a la URL correcta)
const API_URL = "http://18.230.216.176:8000/api"; // Cambia esto si la IP de tu API cambia

// Función para obtener todas las facturas
export const getInvoices = async () => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await axios.get(`${API_URL}/facturas/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error("Error al obtener las facturas:", error); // Muestra el error en la consola
    throw error.response?.data || { detail: "Error al obtener las facturas" }; // Lanza el error si algo falla
  }
};

// Función para agregar una nueva factura
export const addInvoice = async (invoiceData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await axios.post(`${API_URL}/facturas/`, invoiceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar la factura:", error);
    throw error.response?.data || { detail: "Error al agregar factura" };
  }
};

// Función para actualizar una factura existente
export const updateInvoice = async (id, invoiceData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await axios.put(`${API_URL}/facturas/${id}/`, invoiceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la factura:", error);
    throw error.response?.data || { detail: "Error al actualizar factura" };
  }
};

// Función para eliminar una factura
export const deleteInvoice = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await axios.delete(`${API_URL}/facturas/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la factura:", error);
    throw error.response?.data || { detail: "Error al eliminar factura" };
  }
};

// Función para obtener todos los clientes
export const getClients = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await axios.get(`${API_URL}/clientes/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos de los clientes
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error.response?.data || { detail: "Error al obtener los clientes" };
  }
};

// Función para obtener todos los proveedores
export const getProviders = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await axios.get(`${API_URL}/proveedores/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos de los proveedores
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
    throw error.response?.data || { detail: "Error al obtener los proveedores" };
  }
};
