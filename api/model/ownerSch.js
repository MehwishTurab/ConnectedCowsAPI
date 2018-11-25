const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    owner_id: mongoose.Schema.Types.ObjectId,
    farmid: { type: String, required: true },
    o_name: { type: String, required: true },
    o_address: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Owner',OwnerSchema);