const mongoose = require('mongoose');

const farmSchema = mongoose.Schema({
    farm_id: mongoose.Schema.Types.ObjectId,
    f_name: { type: String, required: true },
    f_address: {type: String, required: true}
});

module.exports = mongoose.model('Farm',farmSchema);