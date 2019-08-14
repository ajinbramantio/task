require('dotenv').config()
const mongoose = require('../config/mongoose')

// User schema
const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 32
  },
  salt: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  }
})

// User model => users collection
const User = mongoose.model('User', UserSchema)

module.exports = User
