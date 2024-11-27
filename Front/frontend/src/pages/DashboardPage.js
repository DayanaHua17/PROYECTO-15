// DashboardPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Clientes</h2>
                <Link to="/add-client">Agregar Cliente</Link>
                <br />
                <Link to="/clients">Ver Clientes</Link>
            </div>
            <div>
                <h2>Proveedores</h2>
                <Link to="/add-provider">Agregar Proveedor</Link>
                <br />
                <Link to="/providers">Ver Proveedores</Link>
            </div>
        </div>
    );
};

export default DashboardPage;
