const axios = require("axios");

async function getHealthReport() {
    const response = await axios.get("http://localhost:3000/api/health");

    return response.data;
}

module.exports = {
    getHealthReport,
};