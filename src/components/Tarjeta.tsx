interface KpiCardProps {
  title: string;
  value: string | number;
  valueClassName?: string;
  subtitle?: string; 
}

export default function KpiCard({ title, value, valueClassName = "text-gray-900", subtitle }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
        {title}
      </h2>
      
      <p className={`text-3xl font-black ${valueClassName}`}>
        {value}
      </p>
      
      {/* Si 'subtitle' existe, se muestra. Si es null o undefined, no renderiza nada */}
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}