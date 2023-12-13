const mongoose = require('mongoose')

const Schema = mongoose.Schema

// defines the structure you save
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // Set a default role if needed
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
