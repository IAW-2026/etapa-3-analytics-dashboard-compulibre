interface KpiCardProps {
  title: string;
  value: string | number;
  valueClassName?: string;
}

export default function KpiCard({ title, value, valueClassName = "text-gray-900" }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">{title}</h3>
      <p className={`text-3xl font-black text-gray-900 ${valueClassName}`}>{value}</p>
    </div>
  );
}