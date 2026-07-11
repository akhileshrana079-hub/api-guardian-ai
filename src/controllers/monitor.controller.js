const { generateHealthReport } = require("../services/monitor.service");

exports.getHealthReport = (req, res) => {
    res.json(generateHealthReport());
};