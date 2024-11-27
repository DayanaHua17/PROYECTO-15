import axios from "axios";

// Define el endpoint de la API
const API_URL = "http://18.230.216.176:8000/api/";

// Autenticación (login)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login/`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error de conexión" };
  }
};


export const getInvoices = async (token) => {
  try {
    const response = await axios.get(`${API_URL}facturas/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener facturas" };
  }
};

// Obtener todos los clientes (Clientes)
export const getClients = async (token) => {
  try {
    const response = await axios.get(`${API_URL}clientes/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener clientes" };
  }
};

// Obtener todos los proveedores (Proveedores)
export const getProviders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}proveedores/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al obtener proveedores" };
  }
};

// Crear una nueva factura (Invoice)
export const createInvoice = async (token, invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}facturas/`, invoiceData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al crear factura" };
  }
};

// Crear un nuevo cliente (Client)
export const createClient = async (token, clientData) => {
  try {
    const response = await axios.post(`${API_URL}clientes/`, clientData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al crear cliente" };
  }
};

// Crear un nuevo proveedor (Provider)
export const createProvider = async (token, providerData) => {
  try {
    const response = await axios.post(`${API_URL}proveedores/`, providerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al crear proveedor" };
  }
};

// Actualizar una factura (Invoice)
export const updateInvoice = async (token, invoiceId, invoiceData) => {
  try {
    const response = await axios.put(`${API_URL}facturas/${invoiceId}/`, invoiceData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al actualizar factura" };
  }
};

// Actualizar un cliente (Client)
export const updateClient = async (token, clientId, clientData) => {
  try {
    const response = await axios.put(`${API_URL}clientes/${clientId}/`, clientData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al actualizar cliente" };
  }
};

// Actualizar un proveedor (Provider)
export const updateProvider = async (token, providerId, providerData) => {
  try {
    const response = await axios.put(`${API_URL}proveedores/${providerId}/`, providerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al actualizar proveedor" };
  }
};

// Eliminar una factura (Invoice)
export const deleteInvoice = async (token, invoiceId) => {
  try {
    const response = await axios.delete(`${API_URL}facturas/${invoiceId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al eliminar factura" };
  }
};

// Eliminar un cliente (Client)
export const deleteClient = async (token, clientId) => {
  try {
    const response = await axios.delete(`${API_URL}clientes/${clientId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al eliminar cliente" };
  }
};

// Eliminar un proveedor (Provider)
export const deleteProvider = async (token, providerId) => {
  try {
    const response = await axios.delete(`${API_URL}proveedores/${providerId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Error al eliminar proveedor" };
  }
};
