const mongoose = require('mongoose');

const healthSchema = mongoose.Schema({
    cattleid: {type: String, required: true},
    avg_temp: { type: Number, required: true },
    avg_env_temp: { type: Number, required: true },
    avg_env_humidity: { type: Number, required: true },
    status: {type: String, required: true}
});

module.exports = mongoose.model('Health',healthSchema);