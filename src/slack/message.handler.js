const { buildHomeCard } = require("./blockBuilder");
const app = require("./slack.service");

const { askAI } = require("../ai/groq.service");
const { getHealthReport } = require("../services/api.service");
const { analyzeHealth } = require("../ai/health.analyzer");
const { analyzeIncident } = require("../ai/incident.analyzer");
const { getSummary } = require("../services/summary.service");
const { buildSummaryBlocks } = require("./blockBuilder");

app.message(async ({ message, say }) => {
    if (message.subtype) return;

    const text = message.text.toLowerCase();

    try {

        if (text === "menu") {
            await say({
            text: "API Guardian AI",
            blocks: buildHomeCard(),
        });
        return;
}
        // ===== HEALTH REPORT =====
        if (text === "health") {

            await say("🔍 Fetching API health report...");

            const report = await getHealthReport();

            const analysis = await analyzeHealth(report);

            await say(analysis);

            return;
        }

        if (text === "incident") {
        await say("🚨 Generating incident report...");
        const report = await getHealthReport();
        const analysis = await analyzeIncident(report);
        await say(analysis);

    return;
}

    if (text === "summary") {

    const summary = getSummary();

    await say({
        blocks: buildSummaryBlocks(summary),
        text: "API Guardian Summary",
    });

    return;
}
        // ===== NORMAL CHAT =====

        const response = await askAI(message.text);
        await say(response);
    } catch (error) {
        console.error(error);
        await say("❌ Something went wrong.");
    }
});