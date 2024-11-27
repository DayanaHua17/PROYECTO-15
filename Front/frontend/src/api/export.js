import axios from "axios";

// Define tu endpoint base para facturas
const BASE_URL = "http://18.230.216.176:8000/api/facturas/";

// Función para exportar facturas en formato Excel
export const exportToExcel = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      responseType: "blob", // Descargar como archivo binario
      headers: {
        Authorization: `Bearer ${token}`, // Token para autenticación
      },
    });

    // Crea un archivo Excel desde los datos obtenidos
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "facturas.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error al exportar datos a Excel:", error);
    throw error;
  }
};

// Función para exportar facturas en formato PDF
export const exportToPDF = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      responseType: "blob", // Descargar como archivo binario
      headers: {
        Authorization: `Bearer ${token}`, // Token para autenticación
      },
    });

    // Crea un archivo PDF desde los datos obtenidos
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "facturas.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error al exportar datos a PDF:", error);
    throw error;
  }
};

// Función para importar facturas desde un archivo (CSV o Excel)
export const importData = async (token, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token para autenticación
        "Content-Type": "multipart/form-data", // Tipo de contenido para archivos
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al importar datos:", error);
    throw error;
  }
};
