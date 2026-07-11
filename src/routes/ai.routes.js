const express = require("express");

const router = express.Router();

const { askAI } = require("../ai/groq.service");

router.get("/ask", async (req, res) => {

    try {
        const response = await askAI(
            "Explain REST APIs in simple words."
        );

        res.json({
            success: true,
            response
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;