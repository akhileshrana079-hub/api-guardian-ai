require("dotenv").config();
const express = require("express");
const app = express();

const aiRoutes = require("./routes/ai.routes");

app.use(express.json());
app.use("/api/ai", aiRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Guardian AI Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});