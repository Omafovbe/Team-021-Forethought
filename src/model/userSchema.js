const moongoose = require('moongoose');

const { Schema } = moongoose;

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

module.exports = moongoose.model('User', userSchema);
