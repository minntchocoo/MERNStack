const mongoose = require('mongoose')

const Schema = mongoose.Schema

// defines the structure you save
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true

    },
    variation: {
        type: String,
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('Item', itemSchema)

