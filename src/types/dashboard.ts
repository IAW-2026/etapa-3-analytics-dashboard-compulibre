// types/dashboard.ts

export interface PaymentsData {
  totalTransactions: number;
  grossRevenue: number;
  revenueChart: { date: string; revenue: number }[];
}

export interface SellerData {
  activeSellers: number;
  totalProducts: number;
  categoryChart: { category: string; sales: number }[];
}

export interface BuyerData {
  users: {
    total: number;
  };
  carts: {
    total: number;
    active: number;
    converted: number;
    cancelledManual: number;
    rejectedGateway: number;
    conversionRate: string;
  };
}

export interface ShippingData {
  completedDeliveries: number;
  pendingDeliveries: number;
}