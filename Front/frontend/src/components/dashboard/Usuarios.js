import React, { useState, useEffect } from "react";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../../api/usuarios";
import Swal from "sweetalert2"; // Para mensajes tipo alerta

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usuarioForm, setUsuarioForm] = useState({ username: "", email: "", rol: "Administrador" });
  const [editando, setEditando] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getUsuarios(token);
          setUsuarios(response);
        } catch (error) {
          setError("Error al obtener los usuarios");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No se encontró un token válido.");
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleCreateUsuario = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await createUsuario(token, usuarioForm);
        setUsuarios((prevUsuarios) => [...prevUsuarios, response]);
        setUsuarioForm({ username: "", email: "", rol: "Administrador" });
      } catch (error) {
        setError("Error al crear el usuario");
      }
    }
  };

  const handleUpdateUsuario = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token && usuarioId) {
      try {
        const response = await updateUsuario(token, usuarioId, usuarioForm);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) => (usuario.id === usuarioId ? response : usuario))
        );
        setEditando(false);
        setUsuarioId(null);
        setUsuarioForm({ username: "", email: "", rol: "Administrador" });
      } catch (error) {
        setError("Error al actualizar el usuario");
      }
    }
  };

  const handleDeleteUsuario = async (usuarioId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await deleteUsuario(token, usuarioId);
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== usuarioId));
        Swal.fire("Eliminado", "Usuario eliminado correctamente.", "success");
      } catch (error) {
        setError("Error al eliminar el usuario");
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  const handleEditUsuario = (usuario) => {
    setEditando(true);
    setUsuarioId(usuario.id);
    setUsuarioForm({ username: usuario.username, email: usuario.email, rol: usuario.rol });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Usuarios</h2>

      {/* Formulario para agregar o actualizar usuario */}
      <form onSubmit={editando ? handleUpdateUsuario : handleCreateUsuario} className="mb-6">
        <input
          type="text"
          name="username"
          value={usuarioForm.username}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="email"
          name="email"
          value={usuarioForm.email}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <select
          name="rol"
          value={usuarioForm.rol}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        >
          <option value="Administrador">Administrador</option>
          <option value="Contador">Contador</option>
          <option value="Gerente">Gerente</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {editando ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-6 py-4">{usuario.username}</td>
                <td className="px-6 py-4">{usuario.email}</td>
                <td className="px-6 py-4">{usuario.rol}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditUsuario(usuario)}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteUsuario(usuario.id)}
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

export default Usuarios;
