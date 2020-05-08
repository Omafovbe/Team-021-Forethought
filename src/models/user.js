const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, lowercase: true
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birth_date: Date
},
{ timestamps: true });

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({id:this._id},process.env.JWT_PRIVATE_KEY)
  return token;
}

exports.User = mongoose.model('User', userSchema);

