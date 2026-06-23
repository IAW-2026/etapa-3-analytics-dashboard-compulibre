import { PaymentsData, SellerData, BuyerData, ShippingData } from "@/types/dashboard";

async function fetchService<T>(url: string | undefined): Promise<T | null> {
  if (!url) {
    console.error(`🚨 ERROR: La URL de ${name} es undefined en .env.local`);
    return null;
  }

  try {
    const res = await fetch(`${url}/api/analytics/summary`, {
      headers: { 'x-api-key': process.env.ANALYTICS_API_KEY || '' },
      next: { revalidate: 60 } // Cachea por 60 segundos
    });
    if (!res.ok) {
      console.error(`❌ ERROR en llamada: Respondió con status ${res.status}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`❌ ERROR en llamada: ${error}`);
    return null;
  }
}

export async function getGlobalAnalytics() {
  const [paymentsRes, sellerRes, buyerRes, shippingRes] = await Promise.allSettled([
    fetchService<PaymentsData>(process.env.PAYMENTS_APP_URL),
    fetchService<SellerData>(process.env.SELLER_APP_URL),
    fetchService<BuyerData>(process.env.BUYER_APP_URL),
    fetchService<ShippingData>(process.env.SHIPPING_APP_URL),
  ]);

  // Si algo falla, devolvemos los valores por defecto (Fallbacks)
  const payments = paymentsRes.status === 'fulfilled' && paymentsRes.value 
    ? paymentsRes.value 
    : { totalTransactions: 0, grossRevenue: 0, revenueChart: [] };
    
  const seller = sellerRes.status === 'fulfilled' && sellerRes.value 
    ? sellerRes.value 
    : { activeSellers: 0, totalProducts: 0, categoryChart: [] };
    
  const buyer = buyerRes.status === 'fulfilled' && buyerRes.value 
    ? buyerRes.value 
    : { activeBuyers: 0, totalOrdersPlaced: 0 };
    
  const shipping = shippingRes.status === 'fulfilled' && shippingRes.value 
    ? shippingRes.value 
    : { completedDeliveries: 0, pendingDeliveries: 0 };

  return { payments, seller, buyer, shipping };
}