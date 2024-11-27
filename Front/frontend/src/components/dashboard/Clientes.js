// src/components/Clientes.js
import React, { useState, useEffect } from "react";
import { getClientes, createClient, updateClient, deleteClient } from "../../api/clientes";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clientForm, setClientForm] = useState({ nombre: "", email: "", telefono: "" });
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getClientes(token);
          setClientes(response);
        } catch (error) {
          setError("Error al obtener los clientes");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No se encontró un token válido.");
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await createClient(token, clientForm);
        setClientes((prevClients) => [...prevClients, response]);
        setClientForm({ nombre: "", email: "", telefono: "" }); // Clear form
      } catch (error) {
        setError("Error al crear el cliente");
      }
    }
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token && editClient) {
      try {
        const response = await updateClient(token, editClient.id, clientForm);
        setClientes((prevClients) =>
          prevClients.map((client) =>
            client.id === editClient.id ? response : client
          )
        );
        setEditClient(null); // Reset editing
        setClientForm({ nombre: "", email: "", telefono: "" }); // Clear form
      } catch (error) {
        setError("Error al actualizar el cliente");
      }
    }
  };

  const handleDeleteClient = async (clientId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await deleteClient(token, clientId);
        setClientes((prevClients) => prevClients.filter((client) => client.id !== clientId));
      } catch (error) {
        setError("Error al eliminar el cliente");
      }
    }
  };

  const handleEditClient = (client) => {
    setEditClient(client);
    setClientForm({ nombre: client.nombre, email: client.email, telefono: client.telefono });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Clientes</h2>

      {/* Formulario para agregar o actualizar cliente */}
      <form onSubmit={editClient ? handleUpdateClient : handleCreateClient} className="mb-6">
        <input
          type="text"
          name="nombre"
          value={clientForm.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={clientForm.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="telefono"
          value={clientForm.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editClient ? "Actualizar Cliente" : "Crear Cliente"}
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
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="px-6 py-4">{cliente.nombre}</td>
                <td className="px-6 py-4">{cliente.email}</td>
                <td className="px-6 py-4">{cliente.telefono}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditClient(cliente)}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClient(cliente.id)}
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

export default Clientes;
