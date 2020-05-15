const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, lowercase: true
  },
  hash_password: { type: String, required: true },
  phone: { type: String, required: true },
  birth_date: Date
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
