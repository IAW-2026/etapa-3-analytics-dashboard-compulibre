import { PaymentsData, SellerData, BuyerData, ShippingData } from "@/types/dashboard";

async function fetchService<T>(url: string | undefined, endpoint: string = '/api/analytics/summary'): Promise<T | null> {
  if (!url) {
    console.error(`🚨 ERROR: La URL de ${name} es undefined en .env.local`);
    return null;
  }

  try {
    const res = await fetch(`${url}${endpoint}`, {
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
    fetchService<any>(process.env.BUYER_APP_URL, '/api/system/metrics'),
    fetchService<ShippingData>(process.env.SHIPPING_APP_URL),
  ]);

  // Si algo falla, devolvemos los valores por defecto (Fallbacks)
  const payments = paymentsRes.status === 'fulfilled' && paymentsRes.value 
    ? paymentsRes.value 
    : { totalTransactions: 0, grossRevenue: 0, revenueChart: [] };
    
  const seller = sellerRes.status === 'fulfilled' && sellerRes.value 
    ? sellerRes.value 
    : { activeSellers: 0, totalProducts: 0, categoryChart: [] };
    
  const buyerPayload = buyerRes.status === 'fulfilled' ? buyerRes.value : null;
  const buyer: BuyerData = buyerPayload?.success && buyerPayload?.data
    ? {
        users: buyerPayload.data.users || { total: 0 },
        carts: buyerPayload.data.carts || { 
          total: 0, 
          active: 0, 
          converted: 0, 
          cancelledManual: 0, 
          rejectedGateway: 0, 
          conversionRate: "0.0%" 
        }
      }
    : { 
        users: { total: 0 },
        carts: {
          total: 0, 
          active: 0, 
          converted: 0, 
          cancelledManual: 0, 
          rejectedGateway: 0, 
          conversionRate: "0.0%" 
        }
      };
    
  const shipping = shippingRes.status === 'fulfilled' && shippingRes.value 
    ? shippingRes.value 
    : { completedDeliveries: 0, pendingDeliveries: 0 };

  return { payments, seller, buyer, shipping };
}