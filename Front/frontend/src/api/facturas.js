import axios from "axios";

const BASE_URL = "http://18.230.216.176:8000/api/facturas/";

// Función para obtener las facturas
export const getFacturas = async () => {
  const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local

  // Verificar si el token está disponible
  if (!token) {
    console.error("Token de autenticación no disponible.");
    throw new Error("Token de autenticación no disponible.");
  }

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
      },
    });

    // Retornar las facturas si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Manejo de errores de la solicitud
    console.error("Error al obtener las facturas:", error.response ? error.response.data : error.message);
    throw new Error("No se pudieron obtener las facturas. Intenta de nuevo más tarde.");
  }
};
