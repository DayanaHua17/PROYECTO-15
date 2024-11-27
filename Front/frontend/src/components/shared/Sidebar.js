import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/users">Usuarios</Link>
      <Link to="/dashboard/clients">Clientes</Link>
      <Link to="/dashboard/invoices">Facturas</Link>
      <Link to="/dashboard/invoices/new">Nueva Factura</Link>
    </div>
  );
};

export default Sidebar;
