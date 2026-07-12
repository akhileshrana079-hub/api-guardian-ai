const express = require("express");

const router = express.Router();

const {
    getHealthReport
} = require("../controllers/monitor.controller");

router.get("/health", getHealthReport);

module.exports = router;