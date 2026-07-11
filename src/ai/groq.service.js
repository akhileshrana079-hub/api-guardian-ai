const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function askAI(prompt) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "You are API Guardian AI. You help backend developers analyze API health, incidents and server logs.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
    });

    return chatCompletion.choices[0].message.content;
}

module.exports = {
    askAI,
};