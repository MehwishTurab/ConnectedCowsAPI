const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    record_id: mongoose.Schema.Types.ObjectId,
    cattleid: {type: String, required: true},
    temp: { type: Number, required: true }
});

module.exports = mongoose.model('Record',RecordSchema);