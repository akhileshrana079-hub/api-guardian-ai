require("dotenv").config();

const express = require("express");
const slackApp = require("./slack/slack.service");

require("./slack/message.handler");

const monitorRoutes = require("./routes/monitor.routes");
const app = express();

app.use(express.json());

app.use("/api", monitorRoutes);


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

    app.listen(PORT, () => {
        console.log(`🚀 Express Server running on ${PORT}`);
    });
})();