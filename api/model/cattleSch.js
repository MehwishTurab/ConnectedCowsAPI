const mongoose = require('mongoose');

const CattleSchema = mongoose.Schema({
    cattle_id: mongoose.Schema.Types.ObjectId,
    farmid: { type: String, required: true },
    ownerid: { type: String, required: true }
});

module.exports = mongoose.model('Cattle',CattleSchema);