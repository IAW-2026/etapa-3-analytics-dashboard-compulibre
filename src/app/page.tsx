import Navbar from "@/components/Navbar";
import KpiCard from "@/components/Tarjeta";
import RevenueChart from "@/components/RevenueChart";
import CategoryChart from "@/components/CategoryChart";
import { PaymentsData, SellerData, BuyerData, ShippingData } from "@/types/dashboard";

async function fetchService<T>(url: string | undefined): Promise<T | null> {
  if (!url) return null;
  try {
    const res = await fetch(`${url}/api/analytics/summary`, {
      headers: { 'x-api-key': process.env.ANALYTICS_API_KEY || '' },
      next: { revalidate: 60 } // Cachea por 60 segundos para no saturar a las otras apps
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function AnalyticsDashboard() {

  // Disparamos las 4 peticiones en paralelo
  const [paymentsRes, sellerRes, buyerRes, shippingRes] = await Promise.allSettled([
    fetchService<PaymentsData>(process.env.PAYMENTS_APP_URL),
    fetchService<SellerData>(process.env.SELLER_APP_URL),
    fetchService<BuyerData>(process.env.BUYER_APP_URL),
    fetchService<ShippingData>(process.env.SHIPPING_APP_URL),
  ]);

  // Extraemos los datos (o seteamos fallbacks si alguna falló)
  const payments = paymentsRes.status === 'fulfilled' && paymentsRes.value ? paymentsRes.value : { totalTransactions: 0, grossRevenue: 0, revenueChart: [] };
  const seller = sellerRes.status === 'fulfilled' && sellerRes.value ? sellerRes.value : { activeSellers: 0, totalProducts: 0, categoryChart: [] };
  const buyer = buyerRes.status === 'fulfilled' && buyerRes.value ? buyerRes.value : { activeBuyers: 0, totalOrdersPlaced: 0 };
  const shipping = shippingRes.status === 'fulfilled' && shippingRes.value ? shippingRes.value : { completedDeliveries: 0, pendingDeliveries: 0 };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
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
          <KpiCard title="Usuarios Compradores" value={buyer.activeBuyers.toLocaleString('es-AR')}/>
          <KpiCard title="Vendedores Activos" value={seller.activeSellers.toLocaleString('es-AR')}/>
          <KpiCard title="Volumen Total Procesado" value={formatCurrency(payments.grossRevenue)} valueClassName="text-green-600"/>

          <div className="lg:col-span-1 sm:col-span-2 col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Estadisticas shipping</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <KpiCard title="Envíos Completados" value={shipping.completedDeliveries.toLocaleString('es-AR')}/>
              <KpiCard title="Envíos Pendientes" value={shipping.pendingDeliveries.toLocaleString('es-AR')}/>
            </div>
          </div>
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


        </div>
      </main>
    </div>
  );
}

