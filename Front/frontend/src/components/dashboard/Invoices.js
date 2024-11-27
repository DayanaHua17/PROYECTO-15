import React, { useState, useEffect } from "react";
import { getInvoices, addInvoice, deleteInvoice, getClients, getProviders } from "../../api/invoices";  // Asegúrate de tener las rutas correctas
import { Trash2, Edit } from "react-feather";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]); // Estado para almacenar clientes
  const [providers, setProviders] = useState([]); // Estado para almacenar proveedores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    numero_factura: "",
    cliente: "",
    proveedor: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    monto_total: "",
    estado: "",
    tipo: "",
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();  // Llama a la función para obtener las facturas
      setInvoices(data);
    };
    fetchInvoices();

    const fetchClients = async () => {
      const data = await getClients(); // Llamar a la API para obtener clientes
      setClients(data);
    };
    fetchClients();

    const fetchProviders = async () => {
      const data = await getProviders(); // Llamar a la API para obtener proveedores
      setProviders(data);
    };
    fetchProviders();
  }, []);

  const handleAddInvoice = async (invoiceData) => {
    const newInvoice = await addInvoice(invoiceData);  // Agregar factura
    if (newInvoice) {
      setInvoices([...invoices, newInvoice]);  // Actualizamos la lista de facturas
      setIsModalOpen(false);
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(id);  // Eliminar factura
      setInvoices(invoices.filter((invoice) => invoice.id !== id));  // Actualizar lista de facturas
    }
  };

  const generateInvoiceNumber = () => {
    return Math.floor(Math.random() * 1000000); // Genera un número aleatorio
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gestión de Facturas</h2>
        <button
          onClick={() => {
            setFormData({
              numero_factura: generateInvoiceNumber(), // Establece el número de factura aleatorio
              cliente: "",
              proveedor: "",
              fecha_emision: "",
              fecha_vencimiento: "",
              monto_total: "",
              estado: "",
              tipo: "",
            });
            setIsModalOpen(true);  // Mostrar modal para agregar factura
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Agregar Factura
        </button>
      </div>

      {/* Tabla de Facturas */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emisión</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.numero_factura}</td>
                <td className="px-6 py-4">{invoice.cliente}</td>
                <td className="px-6 py-4">{invoice.proveedor}</td>
                <td className="px-6 py-4">{invoice.fecha_emision}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteInvoice(invoice.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar factura */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Agregar Factura</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddInvoice(formData);
              }}
            >
              <input
                type="text"
                name="numero_factura"
                value={formData.numero_factura}
                readOnly
                className="border border-gray-300 p-2 mb-2 w-full"
              />
              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
                required
              >
                <option value="">Seleccionar Cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.nombre}</option>
                ))}
              </select>
              <select
                name="proveedor"
                value={formData.proveedor}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
                required
              >
                <option value="">Seleccionar Proveedor</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>{provider.nombre}</option>
                ))}
              </select>
              <input
                type="date"
                name="fecha_emision"
                value={formData.fecha_emision}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
                required
              />
              <input
                type="date"
                name="fecha_vencimiento"
                value={formData.fecha_vencimiento}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
                required
              />
              <input
                type="number"
                name="monto_total"
                value={formData.monto_total}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
                required
              />
              <select
                name="estado"
                value={formData.estado}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
              >
                <option value="">Estado</option>
                <option value="Emitida">Emitida</option>
                <option value="Recibida">Recibida</option>
              </select>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-2 w-full"
              >
                <option value="">Tipo</option>
                <option value="Factura">Factura</option>
                <option value="Nota">Nota</option>
              </select>
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
