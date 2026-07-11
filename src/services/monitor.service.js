const endpoints = [
  "/api/auth/login",
  "/api/users",
  "/api/orders",
  "/api/products",
  "/api/payments",
  "/api/notifications"
];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHealthReport() {
  const endpointMetrics = endpoints.map(endpoint => ({
    endpoint,
    requests: random(500, 5000),
    avgLatency: random(50, 600),
    errors: random(0, 20)
  }));

  return {
    timestamp: new Date().toISOString(),
    totalRequests: endpointMetrics.reduce((a, b) => a + b.requests, 0),
    successRate: (99 + Math.random()).toFixed(2),
    cpuUsage: random(20, 95),
    memoryUsage: random(30, 90),
    endpointMetrics
  };
}

module.exports = {
  generateHealthReport
};