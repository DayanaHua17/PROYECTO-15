import React, { useState, useEffect } from 'react';
import { getFacturas } from '../../api/facturas';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const ContableDashboard = ({ token }) => {
  const [facturas, setFacturas] = useState([]);
  const [totalPorCobrar, setTotalPorCobrar] = useState(0);
  const [totalPorPagar, setTotalPorPagar] = useState(0);
  const [facturasVencidas, setFacturasVencidas] = useState([]);
  const [totalNoVencidas, setTotalNoVencidas] = useState(0); // Acumulado de facturas no vencidas

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFacturas(token);
      setFacturas(data);
      calculateMetrics(data);
    };
    fetchData();
  }, [token]);

  const calculateMetrics = (facturas) => {
    let totalCobrar = 0;
    let totalPagar = 0;
    let totalAcumuladoNoVencidas = 0;
    const vencidas = [];

    facturas.forEach(factura => {
      const fechaVencimiento = new Date(factura.fecha_vencimiento);
      const hoy = new Date();

      // Clasificar las facturas vencidas
      if (fechaVencimiento < hoy) {
        vencidas.push(factura);
      } else {
        totalAcumuladoNoVencidas += parseFloat(factura.monto_total);
      }

      // Sumar montos según el tipo
      if (factura.estado === 'Pendiente') {
        if (factura.tipo === 'Emitida') {
          totalCobrar += parseFloat(factura.monto_total);
        } else if (factura.tipo === 'Recibida') {
          totalPagar += parseFloat(factura.monto_total);
        }
      }
    });

    setTotalPorCobrar(totalCobrar);
    setTotalPorPagar(totalPagar);
    setFacturasVencidas(vencidas);
    setTotalNoVencidas(totalAcumuladoNoVencidas);
  };

  // Configuración para el gráfico de barras
  const data = {
    labels: facturas.map(factura => new Date(factura.fecha_emision).toLocaleDateString()),
    datasets: [
      {
        label: 'Monto Acumulado No Vencidas',
        data: facturas
          .filter(factura => new Date(factura.fecha_vencimiento) >= new Date())
          .map(factura => factura.monto_total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard Contable</h2>

      {/* Totales */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg">
          <h3 className="font-bold">Total por Cobrar</h3>
          <p>${totalPorCobrar.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg">
          <h3 className="font-bold">Total por Pagar</h3>
          <p>${totalPorPagar.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="font-bold">Total No Vencidas</h3>
          <p>${totalNoVencidas.toFixed(2)}</p>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Montos Acumulados No Vencidas</h3>
        <Bar data={data} />
      </div>

      {/* Facturas Vencidas */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Facturas Vencidas</h3>
        {facturasVencidas.length > 0 ? (
          <ul>
            {facturasVencidas.map(factura => (
              <li key={factura.id} className="text-red-600">
                {factura.numero_factura} - {factura.cliente_nombre} - ${factura.monto_total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay facturas vencidas.</p>
        )}
      </div>
    </div>
  );
};

export default ContableDashboard;
