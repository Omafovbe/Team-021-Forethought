const bcrypt = require('bcrypt');
const _ = require('lodash');
const Consultant = require('../models/consultant');


const authenticate = async ({ email, password }) => {
  const consultant = await Consultant.findOne({ email });

  let token = '';
  if (consultant && bcrypt.compare(password, consultant.password)) {
    token = consultant.generateAuthToken();
  }

  return { token };
};

const create = async (reqParam) => {
  // Check for existing consultant
  let consultant = await Consultant.findOne({ email: reqParam.email });
  if (consultant) throw new Error('Consultant already exist');

  try {
    consultant = new Consultant(_.pick(reqParam, ['firstname', 'lastname', 'email', 'password', 'phone', 'certification', 'workplace']));

    // Hash consultant's password
    consultant.password = await bcrypt.hash(consultant.password, 10);

    // Save to database
    await consultant.save();
  } catch (error) {
    throw new Error(`Consultant could not be saved: ${error}`);
  }
};

module.exports = {
  authenticate,
  create
};
