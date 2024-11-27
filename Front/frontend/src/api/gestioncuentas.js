import axios from "axios";

const API_URL = "http://18.230.216.176:8000/api/";

// Obtener facturas
export const fetchFacturas = async () => {
  const response = await axios.get(`${API_URL}facturas/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// Obtener clientes
export const fetchClientes = async () => {
  const response = await axios.get(`${API_URL}clientes/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// **Nuevo**: Obtener proveedores
export const fetchProveedores = async () => {
  const response = await axios.get(`${API_URL}proveedores/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// Registrar una nueva factura
export const registrarFactura = async (factura) => {
  const response = await axios.post(`${API_URL}facturas/`, factura, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Filtrar facturas
export const filtrarFacturas = async (filtros) => {
  const params = new URLSearchParams(filtros).toString();
  const response = await axios.get(`${API_URL}facturas/?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
