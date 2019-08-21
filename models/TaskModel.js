const mongoose = require('../config/mongoose')
const { ObjectId } = mongoose.Schema
// User schema
const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  items: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  totalItem: {
    type: Number
  },
  price: Number,
  totalPrice: Number,
  date: Date,
  creator: {
    type: ObjectId,
    ref: 'User'
  }
})

// User model => users collection
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
