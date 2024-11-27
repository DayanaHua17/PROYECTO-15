import axios from "axios";

const API_URL = "http://18.230.216.176:8000/api";

export const getClients = async (token) => {
  const response = await axios.get(`${API_URL}/clientes/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
