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
  location: { type: String },
  birthDate: Date,
  userLatitude: { type: Number, default: 0 },
  userLongitude: { type: Number, default: 0 }
},
{ timestamps: true });


module.exports = mongoose.model('User', userSchema);
