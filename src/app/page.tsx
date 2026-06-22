import Navbar from "@/components/Navbar";
import KpiCard from "@/components/Tarjeta";
import { mockDashboardData } from "@/lib/mockData";

export default function AnalyticsDashboard() {

  // Extraemos las métricas de nuestros datos simulados
  const { metrics } = mockDashboardData;

  // Helper para formatear moneda local
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Titulo */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">

        <header className="mb-8 flex justify-between items-end border-b pb-4">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">Resumen Global</h2>
            <p className="text-gray-500">Métricas en tiempo real de todo el ecosistema.</p>
          </div>
        </header>

        {/* 1. Sección de Tarjetas*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Usuarios Activos" 
            value={metrics.activeUsers.toLocaleString('es-AR')} 
          />
          <KpiCard 
            title="Transacciones Totales" 
            value={metrics.totalTransactions.toLocaleString('es-AR')} 
          />
          <KpiCard 
            title="Ingresos Brutos" 
            value={formatCurrency(metrics.grossRevenue)} 
            valueClassName="text-green-600" 
          />
          <KpiCard 
            title="Pedidos Completados" 
            value={metrics.completedOrders.toLocaleString('es-AR')} 
          />
        </div>

        {/* 2. Sección de Gráficos  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Contenedor Gráfico 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[350px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolución de Ingresos</h3>
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
              <span className="text-gray-400 font-medium">Espacio para Recharts LineChart</span>
            </div>
          </div>

          {/* Contenedor Gráfico 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[350px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventas por Categoría</h3>
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
              <span className="text-gray-400 font-medium">Espacio para Recharts PieChart</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}