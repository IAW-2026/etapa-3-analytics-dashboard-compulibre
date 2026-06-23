// lib/mockData.ts
import { DashboardData } from '@/types/dashboard';

export const mockDashboardData: DashboardData = {
  metrics: {
    activeUsers: 1254,
    totalTransactions: 843,
    grossRevenue: 4520000, 
    completedOrders: 790,
  },
  revenueChart: [
    { date: '16/06', revenue: 150000 },
    { date: '17/06', revenue: 200000 },
    { date: '18/06', revenue: 180000 },
    { date: '19/06', revenue: 250000 },
    { date: '20/06', revenue: 300000 },
    { date: '21/06', revenue: 280000 },
    { date: '22/06', revenue: 400000 },
  ],
  categoryChart: [
    { category: 'Componentes PC', sales: 45 },
    { category: 'Periféricos', sales: 30 },
    { category: 'Monitores', sales: 15 },
    { category: 'Accesorios', sales: 10 },
  ]
};