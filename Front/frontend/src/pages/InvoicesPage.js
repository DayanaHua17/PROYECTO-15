import React, { useEffect, useState } from "react";
import { getInvoices } from "../api/invoices"; // Crear en `api/invoices.js`

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) return <p>Cargando facturas...</p>;

  return (
    <div>
      <h1>Listado de Facturas</h1>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Fecha Emisión</th>
            <th>Fecha Vencimiento</th>
            <th>Monto Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.numero_factura}</td>
              <td>{invoice.cliente_nombre}</td>
              <td>{invoice.fecha_emision}</td>
              <td>{invoice.fecha_vencimiento}</td>
              <td>{invoice.monto_total}</td>
              <td>{invoice.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesPage;
