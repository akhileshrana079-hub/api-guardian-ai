const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function askAI(prompt) {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content:
                    "You are API Guardian AI. You help backend developers analyze APIs, incidents, logs, and backend systems."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return completion.choices[0].message.content;
}

module.exports = {
    askAI
};