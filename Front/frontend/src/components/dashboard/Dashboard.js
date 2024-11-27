import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Invoices from "./Invoices"; 
import Clientes from "./Clientes"; 
import Proveedores from "./Proveedores"; 
import Usuarios from "./Usuarios";
import GestionCuentas from "./GestionCuentas"; // Importa el componente para Contador
import ExportImport from "./ExportImport";
import ContableDashboard from "./ContableDashboard";
import { Menu, X } from "react-feather";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();

  // Obtener usuario y rol desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.rol || "Sin rol";

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirige al login
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch("http://18.230.216.176:8000/api/facturas/");
      const data = await response.json();
      setInvoices(data);
    };

    const fetchProveedores = async () => {
      const response = await fetch("http://18.230.216.176:8000/api/proveedores/");
      const data = await response.json();
      setProveedores(data);
    };

    fetchInvoices();
    fetchProveedores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white border-r border-gray-200`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <a
            href="#invoices"
            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span>Invoices</span>
          </a>
          <a
            href="#clientes"
            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span>Clientes</span>
          </a>
          <a
            href="#proveedores"
            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span>Proveedores</span>
          </a>
          
          {role === "Contador" && (
            <a
              href="#gestion-cuentas"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span>Gestión Cuentas</span>
            </a>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          {/* Botón para abrir el sidebar */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* Rol del usuario y botón de cerrar sesión */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Rol: {role}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

       
        {/* Mostrar contenido basado en el rol */}
        {role === "Contador" ? (
          <GestionCuentas />
        ) : (
          <div>
            <h3 className="text-lg font-medium text-gray-600">
              Bienvenido, {role}
            </h3>
            <p className="text-gray-500">
              Este es tu Dashboard. Selecciona una opción en el menú lateral.
            </p>
          </div>
        
        )}

        {role === "Administrador" && (
        <section id="export-import" className="mt-8">
         <ContableDashboard />
         <Clientes/>
         <Invoices/>
        </section> 
        )}

        {role === "Gerente" && (
        <section id="export-import" className="mt-8">
          <ExportImport />
        </section> 
        )}


      </div>
    </div>
  );
};

export default Dashboard;
