"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ConversionChart({ orders, payments }: { orders: number, payments: number }) {
  // Armamos la data al vuelo con los dos props que recibimos
  const data = [
    { name: 'Órdenes Iniciadas', cantidad: orders, color: '#9CA3AF' }, // Gris (Intento)
    { name: 'Pagos Exitosos', cantidad: payments, color: '#10B981' }   // Verde (Éxito)
  ];

  if (orders === 0 && payments === 0) return <p className="text-gray-500 text-sm">No hay datos de conversión.</p>;

  // Calculamos el porcentaje para mostrarlo en el panel
  const conversionRate = orders > 0 ? Math.round((payments / orders) * 100) : 0;

  return (
    <div className="w-full flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Tasa de éxito general</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
          {conversionRate}% Conversión
        </span>
      </div>
      
      <div className="w-full">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="cantidad" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}