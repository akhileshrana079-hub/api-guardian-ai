export default function RecommendationCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500 transition">

      <h2 className="text-2xl font-bold text-white mb-6">
        🤖 AI Recommendation
      </h2>

      <div className="space-y-5">

        <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-4">

          <p className="text-yellow-300 font-semibold">
            Payment API latency is increasing.
          </p>

        </div>

        <ul className="space-y-3 text-slate-300">

          <li>✅ Investigate slow SQL queries</li>

          <li>✅ Enable Redis caching</li>

          <li>✅ Monitor CPU spikes</li>

          <li>✅ Add database indexes</li>

        </ul>

      </div>

    </div>
  );
}