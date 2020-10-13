const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Device = new Schema({
    device_name : {
        type: String
    },
    device_description: {
        type: String
    },
    device_quantity: {
        type: Number
    },
    device_responsible: {
        type: String
    },
    device_priority: {
        type: String
    },
    device_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Device', Device);
