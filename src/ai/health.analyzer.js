const { askAI } = require("./groq.service");

async function analyzeHealth(report) {

    const prompt = `
Analyze the following API monitoring report.

Return your answer in this format.

🟢 API Health Report

Total Requests:
Success Rate:
CPU Usage:
Memory Usage:

Top Slow Endpoints

- endpoint
- endpoint
- endpoint

AI Analysis

- ...
- ...
- ...
- ...

Monitoring Data:

${JSON.stringify(report, null, 2)}
`;

    return await askAI(prompt);
}

module.exports = {
    analyzeHealth,
};