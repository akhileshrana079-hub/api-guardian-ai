const { askAI } = require("../ai/groq.service");

async function chatWithAI(req, res) {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const reply = await askAI(message);

        res.json({
            success: true,
            reply,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    chatWithAI,
};