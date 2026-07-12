const { askAI } = require("./groq.service");

async function analyzeIncident(report) {

    const prompt = `
You are a Senior Site Reliability Engineer.

Generate a professional Incident Report.

Use this format.

🚨 Incident Report

Severity:

Summary:

Affected Services:

Business Impact:

Possible Root Cause:

Recommendations:

Monitoring Data:

${JSON.stringify(report, null, 2)}

Keep it concise.
`;

    return await askAI(prompt);

}

module.exports = {
    analyzeIncident
};