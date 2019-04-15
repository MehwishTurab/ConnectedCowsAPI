const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {type: String, required: true},
    owner_id : {type:String, require: true},
});

module.exports = mongoose.model('message',messageSchema);