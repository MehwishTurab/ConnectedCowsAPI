const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    record_id: mongoose.Schema.Types.ObjectId,
    cattleid: {type: String, required: true},
    createdOn: {type: Date, default:Date.now},
    temp: { type: Number, required: true },
    env_temp: { type: Number, required: true },
    env_humidity: { type: Number, required: true },
});

module.exports = mongoose.model('Record',RecordSchema);