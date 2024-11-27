import React from "react";
import { exportToExcel, exportToPDF, importData } from "../../api/export";

const ExportImport = () => {
  const token = localStorage.getItem("token");

  const handleExportExcel = async () => {
    try {
      await exportToExcel(token);
      alert("Exportación a Excel exitosa");
    } catch (error) {
      alert("Error al exportar a Excel");
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF(token);
      alert("Exportación a PDF exitosa");
    } catch (error) {
      alert("Error al exportar a PDF");
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    try {
      await importData(token, file);
      alert("Importación exitosa");
    } catch (error) {
      alert("Error al importar datos");
    }
  };

  return (
    <div>
      <h3>Exportar e Importar Facturas</h3>
      <button onClick={handleExportExcel}>Exportar a Excel</button>
      <button onClick={handleExportPDF}>Exportar a PDF</button>
      <input type="file" onChange={handleImport} />
    </div>
  );
};

export default ExportImport;
