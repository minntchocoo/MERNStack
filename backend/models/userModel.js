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
      
}, {timestamps: true })

module.exports = mongoose.model('User', userSchema)

