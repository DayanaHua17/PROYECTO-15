// ClientsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('/api/clients')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
        <div>
            <h1>Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.nombre}</td>
                            <td>{client.email}</td>
                            <td>{client.telefono}</td>
                            <td>
                                <Link to={`/edit-client/${client.id}`}>Editar</Link> | 
                                <button onClick={() => deleteClient(client.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const deleteClient = (id) => {
    axios.delete(`/api/clients/${id}`)
        .then(() => {
            alert('Cliente eliminado');
            window.location.reload();
        })
        .catch(error => console.error('Error deleting client:', error));
};

export default ClientsPage;
