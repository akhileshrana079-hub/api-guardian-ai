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
        requests: random(200, 5000),
        avgLatency: random(30, 600),
        errors: random(0, 25)
    }));

    return {
        timestamp: new Date().toISOString(),

        totalRequests: endpointMetrics.reduce(
            (sum, item) => sum + item.requests,
            0
        ),

        successRate: (99 + Math.random()).toFixed(2),

        cpuUsage: random(15, 90),

        memoryUsage: random(20, 85),

        endpointMetrics
    };
}

module.exports = {
    generateHealthReport
};