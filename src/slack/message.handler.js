const app = require("./slack.service");
const { askAI } = require("../ai/groq.service");

app.message(async ({ message, say }) => {
    if (message.subtype) return;

    console.log("User:", message.text);

    try {
        const response = await askAI(message.text);

        await say(response);
    } catch (error) {
        console.error(error);

        await say("Something went wrong while talking to AI.");
    }
});