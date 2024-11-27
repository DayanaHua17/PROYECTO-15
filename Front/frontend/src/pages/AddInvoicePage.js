import React, { useState } from "react";
import { addInvoice } from "../api/invoices"; // Crear función en `api/invoices.js`
import { useNavigate } from "react-router-dom";

const AddInvoicePage = () => {
  const [formData, setFormData] = useState({
    numero_factura: "",
    cliente: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    monto_total: "",
    estado: "Pendiente",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInvoice(formData);
      navigate("/dashboard/invoices");
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  return (
    <div>
      <h1>Registrar Nueva Factura</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="numero_factura"
          placeholder="Número de Factura"
          value={formData.numero_factura}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cliente"
          placeholder="ID del Cliente"
          value={formData.cliente}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha_emision"
          placeholder="Fecha de Emisión"
          value={formData.fecha_emision}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha_vencimiento"
          placeholder="Fecha de Vencimiento"
          value={formData.fecha_vencimiento}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="monto_total"
          placeholder="Monto Total"
          value={formData.monto_total}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AddInvoicePage;
