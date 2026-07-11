const app = require("./slack.service");

app.message(async ({ message, say }) => {
    console.log("Message received:");
    console.log(message);

    await say(`👋 Hello ${message.user}, I received: "${message.text}"`);
});