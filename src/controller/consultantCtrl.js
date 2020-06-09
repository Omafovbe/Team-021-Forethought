/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Messages = require('../models/messageSchema');
const User = require('../models/user');
const Consultant = require('../models/consultant');


const authenticate = async ({ email, password }) => {
  const consultant = await Consultant.findOne({ email });
  const consultantId = consultant._id;
  let token = '';
  if (consultant && bcrypt.compare(password, consultant.password)) {
    token = jwt.sign({ id: consultant._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
  }

  return {
    consultantId,
    firstname: consultant.firstname,
    lastname: consultant.lastname,
    phone: consultant.phone,
    email: consultant.email,
    token
  };
};

const create = async (reqParam) => {
  // Check for existing consultant
  let consultant = await Consultant.findOne({ email: reqParam.email });
  if (consultant) throw new Error('Consultant already exist');

  try {
    consultant = new Consultant(reqParam);

    // Hash consultant's password
    consultant.password = await bcrypt.hash(consultant.password, 10);

    // Save to database
    await consultant.save();
  } catch (error) {
    throw new Error(`Consultant could not be saved: ${error}`);
  }
};

const contactedUsers = async (reqId) => {
  const patients = await Messages.find({ consultantId: reqId }).distinct('userId');
  const result = await User.find({ _id: { $in: patients } }, {
    firstname: 1, lastname: 1, email: 1, phone: 1
  });

  return result;
};

const addMessage = async (reqParam) => {
  const message = new Messages(reqParam);
  const res = message.save();
  return res;
};

const messagesByUser = async ({ userId, consultantId }) => {
  const conversations = await Messages.find({ userId, consultantId }, { msgDate: 1, message: 1 })
    .sort({ msgDate: 1 });
  return conversations;
};

module.exports = {
  authenticate,
  create,
  messagesByUser,
  addMessage,
  contactedUsers
};
