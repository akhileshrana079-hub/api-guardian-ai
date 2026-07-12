require("dotenv").config();
const cors = require("cors");
const express = require("express");
const slackApp = require("./slack/slack.service");


require("./slack/message.handler");

const monitorRoutes = require("./routes/monitor.routes");
const aiRoutes = require("./routes/ai.routes");
const monitorSystem = require("./jobs/monitor.job");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", monitorRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Guardian AI Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 3000;

(async () => {
    await slackApp.start();

    console.log("⚡ Slack Bolt running in Socket Mode");
    setInterval(monitorSystem, 30000);
    
    app.listen(PORT, () => {
        console.log(`🚀 Express Server running on ${PORT}`);
    });
})();