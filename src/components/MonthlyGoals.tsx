interface MonthlyGoalsProps {
  currentRevenue: number;
  currentOrders: number;
  currentUsers: number;
  currentPayments: number;
}

export default function MonthlyGoals({ 
  currentRevenue, 
  currentOrders, 
  currentUsers, 
  currentPayments 
}: MonthlyGoalsProps) {
  
  const GOAL_REVENUE = 10000000; 
  const GOAL_ORDERS = 80;      
  const GOAL_USERS = 20;       
  const GOAL_PAYMENTS = 100;    

  const revenuePercent = Math.min(Math.round((currentRevenue / GOAL_REVENUE) * 100), 100) || 0;
  const ordersPercent = Math.min(Math.round((currentOrders / GOAL_ORDERS) * 100), 100) || 0;
  const usersPercent = Math.min(Math.round((currentUsers / GOAL_USERS) * 100), 100) || 0;
  const paymentsPercent = Math.min(Math.round((currentPayments / GOAL_PAYMENTS) * 100), 100) || 0;

  return (
    <div className="flex flex-col h-full space-y-4 mt-2">
      
      {/* Meta 1: Facturación*/}
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-sm font-semibold text-gray-700">Facturación</span>
          <span className="text-xs font-bold text-gray-900">{revenuePercent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${revenuePercent}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          Objetivo: ${(GOAL_REVENUE).toLocaleString('es-AR')}
        </p>
      </div>

      {/* Meta 2: Volumen de Pedidos */}
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-sm font-semibold text-gray-700">Volumen de Pedidos</span>
          <span className="text-xs font-bold text-gray-900">{ordersPercent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${ordersPercent}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          Objetivo: {GOAL_ORDERS.toLocaleString('es-AR')} pedidos
        </p>
      </div>

      {/* Meta 3: Nuevos Usuarios (Comunidad) */}
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-sm font-semibold text-gray-700">Comunidad de Usuarios</span>
          <span className="text-xs font-bold text-gray-900">{usersPercent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${usersPercent}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          Objetivo: {GOAL_USERS.toLocaleString('es-AR')} usuarios
        </p>
      </div>

      {/* Meta 4: Pagos Completados */}
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-sm font-semibold text-gray-700">Pagos Completados</span>
          <span className="text-xs font-bold text-gray-900">{paymentsPercent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${paymentsPercent}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          Objetivo: {GOAL_PAYMENTS.toLocaleString('es-AR')} pagos
        </p>
      </div>

    </div>
  );
}