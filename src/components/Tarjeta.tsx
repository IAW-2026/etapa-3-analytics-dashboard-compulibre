import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  valueClassName?: string;
  subtitle?: string; 
  icon?: ReactNode;
}

export default function KpiCard({ title, value, valueClassName = "text-gray-900", subtitle, icon }: KpiCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">

      <div className="flex items-start gap-3 mb-2">

        {icon && <div className="text-blue-500 bg-gray-50 p-2 rounded-lg shrink-0">{icon}</div>}

        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
          {title}
        </h2>
      </div>

      <div className="mt-auto">
        <p className={`text-3xl font-black ${valueClassName}`}>
          {value}
        </p>

        <div className="min-h-[15px] mt-1">    
          {/* Si 'subtitle' existe, se muestra. Si es null o undefined, no renderiza nada */}
          {subtitle && (
            <p className="text-sm text-gray-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>  
      </div>

    </div>
  );
}