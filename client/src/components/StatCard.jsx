export default function StatCard({
  title,
  value,
  icon,
  trend = "",
  positive = true,
}) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500 transition-all duration-300">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-2">
        {value}
      </h2>

      {trend && (
        <p
          className={`mt-3 text-sm font-semibold ${
            positive
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {trend}
        </p>
      )}

    </div>
  );
}