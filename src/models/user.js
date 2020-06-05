const mongoose = require('mongoose');
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
  location: { type: String, required: true },
  birthDate: Date,
  userLatitude: { type: Number, required: true },
  userLongitude: { type: Number, required: true }
},
{ timestamps: true });


userSchema.methods.generateAuthToken = () => {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model('User', userSchema);
