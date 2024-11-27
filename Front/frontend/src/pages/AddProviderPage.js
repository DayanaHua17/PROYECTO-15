import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProviderPage = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProvider = { nombre, email, telefono };

        axios.post('/api/providers', newProvider)
            .then(() => {
                alert('Proveedor agregado');
                navigate('/providers'); // Redirigir a la lista de proveedores
            })
            .catch(error => console.error('Error adding provider:', error));
    };

    return (
        <div>
            <h1>Agregar Proveedor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Agregar Proveedor</button>
            </form>
        </div>
    );
};

export default AddProviderPage;
