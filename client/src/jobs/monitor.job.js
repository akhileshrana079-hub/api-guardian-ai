const { getHealthReport } = require("../services/api.service");
const { sendAlert } = require("../services/alert.service");

let lastAlert = 0;

async function monitorSystem() {
  try {
    const report = await getHealthReport();

    const now = Date.now();

    if (
      report.cpuUsage > 80 &&
      now - lastAlert > 60000
    ) {
      await sendAlert(`
🚨 *High CPU Usage Detected*

CPU: ${report.cpuUsage}%
Memory: ${report.memoryUsage}%
Requests: ${report.totalRequests}

Please investigate immediately.
      `);

      lastAlert = now;
    }

    if (
      report.memoryUsage > 80 &&
      now - lastAlert > 60000
    ) {
      await sendAlert(`
🚨 *High Memory Usage*

Memory: ${report.memoryUsage}%

Please investigate.
      `);

      lastAlert = now;
    }

  } catch (err) {
    console.log(err.message);
  }
}

module.exports = monitorSystem;