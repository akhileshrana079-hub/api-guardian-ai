import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function ChartSection({ health }) {
  const cpuData = [
    { name: "Now", value: health.cpuUsage },
  ];

  const memoryData = [
    { name: "Now", value: health.memoryUsage },
  ];

  const latencyData = health.endpointMetrics.map((endpoint) => ({
    name: endpoint.endpoint.replace("/api/", ""),
    latency: endpoint.avgLatency,
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-8">

      {/* CPU Chart */}

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

        <h2 className="text-xl font-bold mb-4">
          CPU Usage
        </h2>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={cpuData}>

            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Memory */}

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

        <h2 className="text-xl font-bold mb-4">
          Memory Usage
        </h2>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={memoryData}>

            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Endpoint Latency */}

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 lg:col-span-2">

        <h2 className="text-xl font-bold mb-4">
          Endpoint Latency
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={latencyData}>

            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="latency"
              fill="#facc15"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}