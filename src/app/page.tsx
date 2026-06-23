import Navbar from "@/components/Navbar";
import KpiCard from "@/components/Tarjeta";
import RevenueChart from "@/components/RevenueChart";
import CategoryChart from "@/components/CategoryChart";
import { getGlobalAnalytics } from "@/services/analyticsService";
import ShippingStatusChart from "@/components/ShippingStatusChart";
import ConversionChart from "@/components/ConversionChart";

export default async function AnalyticsDashboard() {

  const { payments, seller, buyer, shipping } = await getGlobalAnalytics();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
  };

  return (

    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Titulo */}
      <main className="flex-grow p-4 md:p-8 max-w-screen-2xl mx-auto w-full space-y-6">

        <header className="mb-8 flex justify-between items-end border-b pb-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Resumen Global</h2>
            <p className="text-gray-500">Métricas en tiempo real de todo el ecosistema.</p>
          </div>
        </header>

        {/* 1. Sección de Tarjetas*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <KpiCard title="Usuarios Compradores" value={buyer.activeBuyers.toLocaleString('es-AR')}/>
          <KpiCard title="Vendedores Activos" value={seller.activeSellers.toLocaleString('es-AR')}/>
          <KpiCard title="Pedidos Realizados" value={buyer.totalOrdersPlaced.toLocaleString('es-AR')}/>
          <KpiCard title="Envíos Completados" value={shipping.completedDeliveries.toLocaleString('es-AR')} subtitle={`De ${shipping.pendingDeliveries + shipping.completedDeliveries} envios totales`} />
          <KpiCard title="Volumen Total Procesado" value={formatCurrency(payments.grossRevenue)} valueClassName="text-green-600" subtitle={ `Promedio por compra: ${payments.grossRevenue / payments.totalTransactions || 0}` } />
        </div>

        {/* 2. Sección de Gráficos  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Evolución de Ingresos</h3>
            <div className="flex-1">
              <RevenueChart data={payments.revenueChart} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Distribución de Ventas</h3>
            <div className="flex-1">
              <CategoryChart data={seller.categoryChart} />
            </div>
          </div>

          {/* 3. NUEVA SECCIÓN: Gráficos Secundarios (50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* Mitad Izquierda: Logística */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Estado de Envíos</h3>
            <div className="flex-1 flex items-center justify-center">
              <ShippingStatusChart 
                completed={shipping.completedDeliveries} 
                pending={shipping.pendingDeliveries} 
              />
            </div>
          </div>

          {/* Mitad Derecha: Conversión */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Tasa de Conversión</h3>
            <div className="flex-1">
              <ConversionChart 
                orders={buyer.totalOrdersPlaced} 
                payments={payments.totalTransactions} 
              />
            </div>
          </div>
        </div>

        </div>
      </main>
    </div>
  );
}

