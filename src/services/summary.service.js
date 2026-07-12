const { generateHealthReport } = require("./monitor.service");

function getSummary() {

    const report = generateHealthReport();

    return {
        health: "Healthy",
        requests: report.totalRequests,
        latency: Math.round(
            report.endpointMetrics.reduce(
                (sum, endpoint) => sum + endpoint.avgLatency,
                0
            ) / report.endpointMetrics.length
        ),
        cpu: report.cpuUsage,
        memory: report.memoryUsage,
        incidents:
            report.endpointMetrics.filter(
                endpoint => endpoint.errors > 10
            ).length,
        recommendation:
            "Payment API latency is elevated. Investigate slow database queries and consider enabling Redis caching.",
    };
}

module.exports = {
    getSummary,
};