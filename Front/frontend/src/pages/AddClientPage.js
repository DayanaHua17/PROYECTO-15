import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddClientPage = () => {
    const [clientData, setClientData] = useState({
        nombre: "",
        email: "",
        telefono: "",
    });

    const navigate = useNavigate(); // Usar useNavigate en lugar de history

    const handleChange = (e) => {
        setClientData({
          ...clientData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newClient = { nombre: clientData.nombre, email: clientData.email, telefono: clientData.telefono };

        axios.post('/api/clients', newClient)
            .then(() => {
                alert('Cliente agregado');
                navigate('/clients'); // Usar navigate en lugar de history.push
            })
            .catch(error => console.error('Error adding client:', error));
    };

    return (
        <div>
          <h2>Agregar Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={clientData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={clientData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={clientData.telefono}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Guardar Cliente</button>
          </form>
        </div>
    );
};

export default AddClientPage;
