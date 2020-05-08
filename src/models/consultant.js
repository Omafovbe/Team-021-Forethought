const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const consultantSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, lowercase: true
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  certification: { type: Array },
  workplace: { type: String }
},
  { timestamps: true });

consultantSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
}

function validateConsultant(consultant) {
  const schema = {
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    email: Joi.string().email().max(255).required().lowercase(),
    password: Joi.string().min(6).max(255).required().strict(),
    phone: Joi.string().min(11).max(15).required(),
    certification: Joi.array(),
    workplace: Joi.string()
  }

  return Joi.validate(consultant, schema);
}

const Consultant = mongoose.model('Consultant', consultantSchema);

exports.Consultant = Consultant;
exports.validateConsultant = validateConsultant;
