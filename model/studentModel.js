const mongoose = require('mongoose')

const student = mongoose.Schema({
  fullname : String,
  email: String,
  phone: Number,
  address: String,
  image: String
})

module.exports = mongoose.model('student',student)