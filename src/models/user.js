const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, lowercase: true
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  birthDate: Date,
  userLatitude: { type: Number, required: true },
  userLongitude: { type: Number, required: true }
},
{ timestamps: true });


module.exports = mongoose.model('User', userSchema);
