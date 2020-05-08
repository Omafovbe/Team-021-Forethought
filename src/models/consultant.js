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

const Consultant = mongoose.model('Consultant', consultantSchema);

exports.Consultant = Consultant;
