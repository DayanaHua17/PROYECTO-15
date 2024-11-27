import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", password: "", rol: "" });
  const [editUser, setEditUser] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (err) {
      alert("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      await createUser(token, newUser);
      fetchUsers();
      setNewUser({ email: "", password: "", rol: "" });
    } catch (err) {
      alert(err.detail || "Error al crear usuario");
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(token, editUser.id, editUser);
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      alert(err.detail || "Error al actualizar usuario");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUser(token, id);
        fetchUsers();
      } catch (err) {
        alert(err.detail || "Error al eliminar usuario");
      }
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      {/* Tabla de usuarios */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button onClick={() => setEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar usuarios */}
      {editUser ? (
        <div>
          <h2>Editar Usuario</h2>
          <input
            type="text"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rol"
            value={editUser.rol}
            onChange={(e) => setEditUser({ ...editUser, rol: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Actualizar</button>
          <button onClick={() => setEditUser(null)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <h2>Crear Usuario</h2>
          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rol"
            value={newUser.rol}
            onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
          />
          <button onClick={handleCreateUser}>Crear</button>
        </div>
      )}
    </div>
  );
};

export default Users;
