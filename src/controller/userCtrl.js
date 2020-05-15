const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ email });

  let token = '';
  if (user && bcrypt.compare(password, user.password)) { token = user.generateAuthToken(); }

  return { token };
};


const create = async (reqParam) => {
  // Check for existing user
  let user = await User.findOne({ email: reqParam.email });
  if (user) throw new Error('User already registered');

  try {
    user = new User(_.pick(reqParam, ['firstname', 'lastname', 'email', 'password', 'location', 'phone', 'birth_date']));

    // Hash user's password
    user.password = await bcrypt.hash(user.password, 10);

    // Save to database
    await user.save();
  } catch (error) {
    throw new Error(`User could not be saved: ${error}`);
  }
};

module.exports = {
  authenticate,
  create
};
