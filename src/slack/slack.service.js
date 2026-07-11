const slackApp = require("../config/slack.config");

slackApp.message(async ({ message, say }) => {

    if (message.subtype) return;

    await say("Hello! I'm API Guardian AI 🤖");

});

module.exports = slackApp;