const mongoose = require('mongoose');

const CattleSchema = mongoose.Schema({
    cattle_id:{ type: Number, required: true },
    farmid: { type: String, required: true },
    ownerid: { type: String, required: true }
});

module.exports = mongoose.model('Cattle',CattleSchema);