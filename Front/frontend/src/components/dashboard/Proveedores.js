// src/components/Proveedores.js
import React, { useState, useEffect } from "react";
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from "../../api/proveedores";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [proveedorForm, setProveedorForm] = useState({ nombre: "", email: "", telefono: "" });
  const [editProveedor, setEditProveedor] = useState(null);

  useEffect(() => {
    const fetchProveedores = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getProveedores(token);
          setProveedores(response);
        } catch (error) {
          setError("Error al obtener los proveedores");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No se encontró un token válido.");
        setLoading(false);
      }
    };

    fetchProveedores();
  }, []);

  const handleCreateProveedor = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await createProveedor(token, proveedorForm);
        setProveedores((prevProveedores) => [...prevProveedores, response]);
        setProveedorForm({ nombre: "", email: "", telefono: "" }); // Limpiar formulario
      } catch (error) {
        setError("Error al crear el proveedor");
      }
    }
  };

  const handleUpdateProveedor = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token && editProveedor) {
      try {
        const response = await updateProveedor(token, editProveedor.id, proveedorForm);
        setProveedores((prevProveedores) =>
          prevProveedores.map((proveedor) =>
            proveedor.id === editProveedor.id ? response : proveedor
          )
        );
        setEditProveedor(null); // Restablecer edición
        setProveedorForm({ nombre: "", email: "", telefono: "" }); // Limpiar formulario
      } catch (error) {
        setError("Error al actualizar el proveedor");
      }
    }
  };

  const handleDeleteProveedor = async (proveedorId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await deleteProveedor(token, proveedorId);
        setProveedores((prevProveedores) => prevProveedores.filter((proveedor) => proveedor.id !== proveedorId));
      } catch (error) {
        setError("Error al eliminar el proveedor");
      }
    }
  };

  const handleEditProveedor = (proveedor) => {
    setEditProveedor(proveedor);
    setProveedorForm({ nombre: proveedor.nombre, email: proveedor.email, telefono: proveedor.telefono });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Proveedores</h2>

      {/* Formulario para agregar o actualizar proveedor */}
      <form onSubmit={editProveedor ? handleUpdateProveedor : handleCreateProveedor} className="mb-6">
        <input
          type="text"
          name="nombre"
          value={proveedorForm.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={proveedorForm.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="telefono"
          value={proveedorForm.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editProveedor ? "Actualizar Proveedor" : "Crear Proveedor"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td className="px-6 py-4">{proveedor.nombre}</td>
                <td className="px-6 py-4">{proveedor.email}</td>
                <td className="px-6 py-4">{proveedor.telefono}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditProveedor(proveedor)}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProveedor(proveedor.id)}
                    className="text-red-500"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedores;
