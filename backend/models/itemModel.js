const mongoose = require('mongoose')

const Schema = mongoose.Schema

// defines the structure you save
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: Buffer,
        required: true
      }
}, {timestamps: true })

module.exports = mongoose.model('Item', itemSchema)

