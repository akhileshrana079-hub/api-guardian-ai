import { useEffect, useState } from "react";
import axios from "axios";

import StatCard from "../components/StatCard";
import ChatPanel from "../components/ChatPanel";

export default function Dashboard() {
  const [health, setHealth] = useState(null);

  async function fetchHealth() {
    try {
      const res = await axios.get("http://localhost:3000/api/health");
      setHealth(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchHealth();

    const interval = setInterval(fetchHealth, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!health) {
    return (
      <div className="min-h-screen bg-[#05091c] flex items-center justify-center text-white text-3xl">
        Loading Dashboard...
      </div>
    );
  }

  const avgLatency = Math.round(
    health.endpointMetrics.reduce(
      (sum, endpoint) => sum + endpoint.avgLatency,
      0
    ) / health.endpointMetrics.length
  );

  const slowEndpoints = [...health.endpointMetrics]
    .sort((a, b) => b.avgLatency - a.avgLatency)
    .slice(0, 5);

  const incidents = health.endpointMetrics.filter(
    (e) => e.errors > 10
  ).length;

  return (
    <div className="min-h-screen bg-[#05091c] text-white p-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-6xl font-bold">
          API Guardian AI
        </h1>

        <p className="text-gray-400 mt-3 text-xl">
          Your AI SRE Dashboard
        </p>

        <div
          className={`mt-6 inline-flex items-center px-5 py-2 rounded-full font-semibold ${
            health.successRate > 98
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {health.successRate > 98
            ? "🟢 Healthy"
            : "🔴 Unhealthy"}
        </div>

      </div>

      {/* Stat Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Requests"
          value={health.totalRequests.toLocaleString()}
          icon="📊"
          trend="Live"
        />

        <StatCard
          title="CPU"
          value={`${health.cpuUsage}%`}
          icon="🖥️"
          trend="Live"
          positive={health.cpuUsage < 80}
        />

        <StatCard
          title="Memory"
          value={`${health.memoryUsage}%`}
          icon="💾"
          trend="Live"
          positive={health.memoryUsage < 80}
        />

        <StatCard
          title="Latency"
          value={`${avgLatency} ms`}
          icon="⚡"
          trend="Average"
          positive={avgLatency < 250}
        />

        <StatCard
          title="Success Rate"
          value={`${health.successRate}%`}
          icon="✅"
          trend="Healthy"
        />

        <StatCard
          title="Incidents"
          value={incidents}
          icon="🚨"
          trend="Detected"
          positive={false}
        />

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">        {/* Slow Endpoints */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-2xl font-bold mb-6">
            Top Slow Endpoints
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-gray-400 border-b border-slate-700">

                <th className="text-left pb-3">Endpoint</th>

                <th className="text-left pb-3">Requests</th>

                <th className="text-left pb-3">Latency</th>

                <th className="text-left pb-3">Errors</th>

              </tr>

            </thead>

            <tbody>

              {slowEndpoints.map((endpoint) => (

                <tr
                  key={endpoint.endpoint}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="py-4 font-medium">
                    {endpoint.endpoint}
                  </td>

                  <td>
                    {endpoint.requests}
                  </td>

                  <td className="text-yellow-400 font-semibold">
                    {endpoint.avgLatency} ms
                  </td>

                  <td
                    className={
                      endpoint.errors > 10
                        ? "text-red-400 font-semibold"
                        : "text-green-400"
                    }
                  >
                    {endpoint.errors}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* AI Recommendation */}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <h2 className="text-2xl font-bold mb-6">
            🤖 AI Recommendation
          </h2>

          <div className="space-y-5">

            <div>

              <h3 className="text-xl font-semibold text-cyan-400">

                Slowest Endpoint

              </h3>

              <p className="text-gray-300 mt-2">

                <strong>{slowEndpoints[0].endpoint}</strong> is currently the
                slowest endpoint with an average latency of{" "}
                <strong>{slowEndpoints[0].avgLatency} ms</strong>.

              </p>

            </div>

            <div>

              <h3 className="text-xl font-semibold text-cyan-400">

                AI Suggestions

              </h3>

              <ul className="mt-3 space-y-3 text-gray-300">

                <li>
                  • Investigate database queries for{" "}
                  <strong>{slowEndpoints[0].endpoint}</strong>
                </li>

                <li>
                  • Enable Redis caching for frequently accessed data.
                </li>

                <li>
                  • Monitor CPU usage ({health.cpuUsage}%).
                </li>

                <li>
                  • Reduce response time below 200 ms.
                </li>

                <li>
                  • Review error logs for endpoints with high failures.
                </li>

              </ul>

            </div>

            <div className="bg-slate-800 rounded-lg p-4">

              <div className="flex justify-between">

                <span>Total Requests</span>

                <span className="font-bold">
                  {health.totalRequests.toLocaleString()}
                </span>

              </div>

              <div className="flex justify-between mt-3">

                <span>Success Rate</span>

                <span className="text-green-400 font-bold">
                  {health.successRate}%
                </span>

              </div>

              <div className="flex justify-between mt-3">

                <span>CPU</span>

                <span
                  className={
                    health.cpuUsage > 80
                      ? "text-red-400 font-bold"
                      : "text-green-400 font-bold"
                  }
                >
                  {health.cpuUsage}%
                </span>

              </div>

              <div className="flex justify-between mt-3">

                <span>Memory</span>

                <span className="font-bold">
                  {health.memoryUsage}%
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* AI Chat */}

      <div className="mt-10">

        <ChatPanel />

      </div>

    </div>

  );

}