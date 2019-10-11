const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//MongoDB Schema
const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   surname: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);