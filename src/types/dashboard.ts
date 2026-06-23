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
  activeBuyers: number;
  totalOrdersPlaced: number;
}

export interface ShippingData {
  completedDeliveries: number;
  pendingDeliveries: number;
}