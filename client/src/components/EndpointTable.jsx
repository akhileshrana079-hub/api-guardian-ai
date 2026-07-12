export default function EndpointTable() {
  const endpoints = [
    { endpoint: "/api/payments", latency: "545 ms", errors: 5 },
    { endpoint: "/api/users", latency: "493 ms", errors: 3 },
    { endpoint: "/api/orders", latency: "312 ms", errors: 2 },
    { endpoint: "/api/products", latency: "198 ms", errors: 1 },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-xl font-bold mb-4 text-white">
        Top Slow Endpoints
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-slate-400 border-b border-slate-700">
            <th className="text-left pb-2">Endpoint</th>
            <th className="text-left pb-2">Latency</th>
            <th className="text-left pb-2">Errors</th>
          </tr>
        </thead>

        <tbody>
          {endpoints.map((item) => (
            <tr
              key={item.endpoint}
              className="border-b border-slate-800"
            >
              <td className="py-3 text-white">{item.endpoint}</td>
              <td className="text-yellow-400">{item.latency}</td>
              <td className="text-red-400">{item.errors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}