"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LeaderboardChart({ data }: { data: { category: string; sales: number }[] }) {
  if (!data || data.length === 0) return <p className="text-gray-500 text-sm">No hay datos.</p>;

  // Ordenamos de mayor a menor ventas para que sea un ranking real
  const sortedData = [...data].sort((a, b) => b.sales - a.sales);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        {/* Usamos layout="vertical" para dar vuelta el gráfico */}
        <BarChart data={sortedData} layout="vertical" margin={{ top: 10, right: 10, left: 40, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
          <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
          <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#374151' }} width={90} />
          <Tooltip 
            cursor={{ fill: '#F9FAFB' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="sales" fill="#6366F1" radius={[0, 4, 4, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}