const moongoose = require('moongoose');

const { Schema } = moongoose;

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

module.exports = moongoose.model('Consultant', consultantSchema);
