const mongoose = require('mongoose');

const CattleSchema = mongoose.Schema({
    cattle_id:{ type: Number, required: true },
    farm_id: { type: Number, required: true },
    owner_id: { type: Number, required: true }
});

module.exports = mongoose.model('Cattle',CattleSchema);