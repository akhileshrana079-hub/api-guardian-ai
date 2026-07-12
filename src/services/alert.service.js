const slackApp = require("../slack/slack.service");

async function sendAlert(message) {
  try {
    await slackApp.client.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text: message,
    });
  } catch (err) {
    console.error("Slack Alert Error:", err.message);
  }
}

module.exports = {
  sendAlert,
};