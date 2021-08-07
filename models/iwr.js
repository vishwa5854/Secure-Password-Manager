const mongoose = require('mongoose');

const iwrSchema = mongoose.Schema({
    iv : {
        type     : Array,
        required : true
    },
    encrypted : {
        type     : String,
        required : true
    }
}, { timestamps : true });

const Iwr = mongoose.model('iwr', iwrSchema, 'iwr');

module.exports = { Iwr };