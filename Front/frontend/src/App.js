import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para el Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Ruta por defecto o para página no encontrada */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default App;
