const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Existing AI chat (keep this for normal chat)
async function askAI(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "You are API Guardian AI. You help backend developers analyze API health, incidents, server logs and backend performance.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.choices[0].message.content;
}

// NEW: AI with live health context
async function analyzeSystem(message, health) {
  const prompt = `
You are API Guardian AI, an expert Site Reliability Engineer (SRE).

Current System Health:

CPU Usage: ${health.cpuUsage}%
Memory Usage: ${health.memoryUsage}%
Success Rate: ${health.successRate}%
Total Requests: ${health.totalRequests}

Endpoint Metrics:

${health.endpointMetrics
  .map(
    (e) =>
      `- ${e.endpoint}
Requests: ${e.requests}
Latency: ${e.avgLatency} ms
Errors: ${e.errors}`
  )
  .join("\n\n")}

User Question:
${message}

Instructions:
- Answer using ONLY the health data above.
- Explain what the problem is.
- Mention the affected endpoint if applicable.
- Suggest practical actions.
- Keep the response concise (under 200 words).
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You are an expert DevOps and Site Reliability Engineer.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = {
  askAI,
  analyzeSystem,
};