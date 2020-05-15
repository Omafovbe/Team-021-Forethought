const mongoose = require('mongoose');

const { Schema } = mongoose;

const consultantSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, lowercase: true
  },
  hash_password: { type: String, required: true },
  phone: { type: String, required: true },
  certification: { type: Array },
  workplace: { type: String }
},
{ timestamps: true });

module.exports = mongoose.model('Consultant', consultantSchema);
