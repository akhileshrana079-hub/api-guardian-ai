const {
  askAI,
  analyzeSystem,
} = require("../ai/groq.service");

async function chatWithAI(req, res) {
  try {
    const { message, health } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    let reply;

    // If dashboard sends live health data,
    // use AI system analysis.
    if (health) {
      reply = await analyzeSystem(message, health);
    } else {
      // Fallback for Slack and normal chat.
      reply = await askAI(message);
    }

    return res.json({
      success: true,
      reply,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  chatWithAI,
};