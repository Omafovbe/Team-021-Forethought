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

function validateUser(user){
  const schema = {
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    email: Joi.string().email().max(255).lowercase().required(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string().min(11).max(15).required(),
    birth_date: Joi.date()
  }

  return Joi.validate(user,schema);
}

exports.User = mongoose.model('User', userSchema);
exports.validateUser = validateUser;
