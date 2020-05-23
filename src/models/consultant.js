const mongoose = require('mongoose');
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
  location: { type: String, required: true },
  certification: { type: Array },
  workplace: { type: String },
  workplaceLatitude: { type: Number, required: true },
  workplaceLongitude: { type: Number, required: true }
},
{ timestamps: true });

consultantSchema.methods.generateAuthToken = () => {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

module.exports = mongoose.model('Consultant', consultantSchema);
