const mongoose = require('mongoose');

const iwrSchema = mongoose.Schema({
    iv : {
        type     : Array,
        required : true
    },
    payload : {
        type     : String,
        required : true
    },
    userId : {
        type     : mongoose.Schema.Types.ObjectId,
        ref      : 'user',
        required : true
    }
}, { timestamps : true });

const Iwr = mongoose.model('iwr', iwrSchema, 'iwr');

module.exports = { Iwr };