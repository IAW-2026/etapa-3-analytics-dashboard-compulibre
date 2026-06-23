"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#10B981', '#F59E0B']; // Verde para entregado, Naranja para pendiente

export default function ShippingStatusChart({ completed, pending }: { completed: number, pending: number }) {
  const data = [
    { name: 'Entregados', value: completed },
    { name: 'En Tránsito', value: pending }
  ];

  if (completed === 0 && pending === 0) return <p className="text-gray-500 text-sm">No hay datos logísticos.</p>;

  return (
    <div className="w-full flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Volumen logístico</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                envíos totales {completed + pending}
            </span>
        </div>

        <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Esto lo hace dona en vez de torta
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter= {(value: any) => {
                // Nos aseguramos de tratarlo como número antes de formatearlo
                const numericValue = Number(value) || 0;
            return [numericValue, 'Envios'];
            }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
        </div>
    </div>
  );
}