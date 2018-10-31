const mongoose = require('mongoose');

const InfoSchema = mongoose.Schema({
    cattleid: {type: String, required: true},
    temp: { type: Number, required: true },
    status: {type: String, required: true}
});

module.exports = mongoose.model('Info',InfoSchema);