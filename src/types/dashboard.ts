// types/dashboard.ts

export interface GlobalMetrics {
  activeUsers: number;
  totalTransactions: number;
  grossRevenue: number;
  completedOrders: number;
}

export interface RevenueByDate {
  date: string;
  revenue: number;
}

export interface SalesByCategory {
  category: string;
  sales: number;
}

export interface DashboardData {
  metrics: GlobalMetrics;
  revenueChart: RevenueByDate[];
  categoryChart: SalesByCategory[];
}