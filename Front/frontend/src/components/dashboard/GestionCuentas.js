import React, { useState, useEffect } from "react";
import {
  fetchFacturas,
  fetchClientes,
  fetchProveedores,
  registrarFactura,
} from "../../api/gestioncuentas";

const GestionCuentas = () => {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    numeroFactura: "",
    cliente: "",
    proveedor: "",
    fechaEmision: "",
    fechaVencimiento: "",
    montoTotal: "",
    estado: "Pendiente",
    tipo: "Emitida",
    usuario: "", // Usuario logueado
  });
  const [filtros, setFiltros] = useState({
    cliente: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });

  // Obtener el usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [facturasData, clientesData, proveedoresData] = await Promise.all([
          fetchFacturas(),
          fetchClientes(),
          fetchProveedores(),
        ]);
        setFacturas(facturasData);
        setClientes(clientesData);
        setProveedores(proveedoresData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  // Generar número de factura único
  const generarNumeroFactura = () => {
    return `FAC-${Date.now()}`;
  };

  // Establecer automáticamente las fechas y usuario
  useEffect(() => {
    const hoy = new Date();
    const fechaVencimiento = new Date(hoy);
    fechaVencimiento.setDate(hoy.getDate() + 7); // Sumar 7 días

    setNuevoRegistro((prev) => ({
      ...prev,
      numeroFactura: generarNumeroFactura(),
      fechaEmision: hoy.toISOString().split("T")[0],
      fechaVencimiento: fechaVencimiento.toISOString().split("T")[0],
      usuario: user?.id, // Asignar automáticamente el usuario logueado
    }));
  }, [user]);

  // Manejar el cambio de los campos del nuevo registro
  const handleInputChange = (e) => {
    setNuevoRegistro({
      ...nuevoRegistro,
      [e.target.name]: e.target.value,
    });
  };

  // Registrar nueva factura
  const handleRegistrarFactura = async (e) => {
    e.preventDefault();
    try {
      const nuevaFactura = await registrarFactura(nuevoRegistro);
      setFacturas((prevFacturas) => [...prevFacturas, nuevaFactura]);
      alert("Factura registrada con éxito.");

      // Resetear los valores (generar nuevos valores automáticos)
      const hoy = new Date();
      const fechaVencimiento = new Date(hoy);
      fechaVencimiento.setDate(hoy.getDate() + 7);

      setNuevoRegistro({
        numeroFactura: generarNumeroFactura(),
        cliente: "",
        proveedor: "",
        fechaEmision: hoy.toISOString().split("T")[0],
        fechaVencimiento: fechaVencimiento.toISOString().split("T")[0],
        montoTotal: "",
        estado: "Pendiente",
        tipo: "Emitida",
        usuario: user?.id,
      });
    } catch (error) {
      console.error("Error al registrar factura:", error);
    }
  };

  // Filtrar facturas
  const facturasFiltradas = facturas.filter((factura) => {
    return (
      (!filtros.cliente || factura.cliente?.nombre.includes(filtros.cliente)) &&
      (!filtros.estado || factura.estado === filtros.estado) &&
      (!filtros.fechaInicio ||
        new Date(factura.fecha_emision) >= new Date(filtros.fechaInicio)) &&
      (!filtros.fechaFin ||
        new Date(factura.fecha_vencimiento) <= new Date(filtros.fechaFin))
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Cuentas por Cobrar</h2>

      {/* Formulario para registrar nueva factura */}
      <form onSubmit={handleRegistrarFactura} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de Factura
          </label>
          <input
            type="text"
            name="numeroFactura"
            value={nuevoRegistro.numeroFactura}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <select
            name="cliente"
            value={nuevoRegistro.cliente}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proveedor
          </label>
          <select
            name="proveedor"
            value={nuevoRegistro.proveedor}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Emisión
          </label>
          <input
            type="date"
            name="fechaEmision"
            value={nuevoRegistro.fechaEmision}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            name="fechaVencimiento"
            value={nuevoRegistro.fechaVencimiento}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monto Total
          </label>
          <input
            type="number"
            name="montoTotal"
            value={nuevoRegistro.montoTotal}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Registrar Factura
        </button>
      </form>

      {/* Listado de facturas */}
      <h3 className="font-bold mb-2">Listado de Facturas</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Número</th>
            <th className="border border-gray-300 px-4 py-2">Cliente</th>
            <th className="border border-gray-300 px-4 py-2">Proveedor</th>
            <th className="border border-gray-300 px-4 py-2">Emisión</th>
            <th className="border border-gray-300 px-4 py-2">Vencimiento</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {facturasFiltradas.map((factura) => (
            <tr key={factura.id}>
              <td className="border border-gray-300 px-4 py-2">
                {factura.numero_factura}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {factura.cliente?.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {factura.proveedor?.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {factura.fecha_emision}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {factura.fecha_vencimiento}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {factura.monto_total}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {factura.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionCuentas;
