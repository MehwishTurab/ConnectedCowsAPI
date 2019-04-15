const mongoose = require('mongoose');

const CattleSchema = mongoose.Schema({
    cattle_id: mongoose.Schema.Types.ObjectId,
    farmid: { type: String, required: true },
    ownerid: { type: String, required: true },
    cattle_name:{type: String, required:false}
});

module.exports = mongoose.model('Cattle',CattleSchema);