const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temp: { type: Number, required: true }
});

module.exports = mongoose.model('Record',RecordSchema);