// ProvidersPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProvidersPage = () => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        axios.get('/api/providers')
            .then(response => {
                setProviders(response.data);
            })
            .catch(error => console.error('Error fetching providers:', error));
    }, []);

    return (
        <div>
            <h1>Proveedores</h1>
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
                    {providers.map(provider => (
                        <tr key={provider.id}>
                            <td>{provider.nombre}</td>
                            <td>{provider.email}</td>
                            <td>{provider.telefono}</td>
                            <td>
                                <Link to={`/edit-provider/${provider.id}`}>Editar</Link> | 
                                <button onClick={() => deleteProvider(provider.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const deleteProvider = (id) => {
    axios.delete(`/api/providers/${id}`)
        .then(() => {
            alert('Proveedor eliminado');
            window.location.reload();
        })
        .catch(error => console.error('Error deleting provider:', error));
};

export default ProvidersPage;
