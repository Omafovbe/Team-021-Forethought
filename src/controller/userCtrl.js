/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Consultant = require('../models/consultant');
const Messages = require('../models/messageSchema');


const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const userId = user._id;
  let token = '';
  if (user && bcrypt.compare(password, user.password)) {
    token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
  }

  return {
    userId,
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    email: user.email,
    token
  };
};


const create = async (reqParam) => {
  // Check for existing user
  let user = await User.findOne({ email: reqParam.email });
  if (user) throw new Error('User already registered');

  try {
    user = new User(_.pick(reqParam, ['firstname', 'lastname', 'email', 'password', 'phone']));

    // Hash user's password
    user.password = await bcrypt.hash(user.password, 10);

    // Save to database
    const savedUser = await user.save();
    return {
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
      email: savedUser.email,
      phone: savedUser.phone,
      userId: savedUser._id
    };
  } catch (error) {
    throw new Error(`User could not be saved - ${error}`);
  }
};

const contactedConsultant = async (reqId) => {
  // const { ObjectId } = mongoose.Types;
  const consults = await Messages.find({ userId: reqId }).distinct('consultantId');
  const result = await Consultant.find({ _id: { $in: consults } }, {
    firstname: 1, lastname: 1, email: 1, phone: 1
  });

  /*  await Messages.aggregate([
    {
      $lookup: {
        from: 'consultants', localField: 'consultantId',
  foreignField: 'consultantId', as: 'consultant'
      }
    },
    { $match: { userId: ObjectId(reqId) } },
    { $group: { _id: '$consultantId', count: { $sum: 1 } } },
    // { $unwind: '$consultant' },
    {
      $project: {
        _id: 1, count: 1, consultant: 1
      }
    }

  ]); */

  return result;
};

const addMessage = async (reqParam) => {
  const message = new Messages(reqParam);
  const res = message.save();
  return res;
};

const messagesByConsultant = async ({ userId, consultantId }) => {
  const conversations = await Messages.find({ userId, consultantId }, { msgDate: 1, message: 1 })
    .sort({ msgDate: 1 });
  return conversations;
};

const getById = async (reqId) => {
  const user = await User.findById(reqId, { password: 0 });
  if (!user) throw new Error('user ID needed to access this page');

  return user;
};


module.exports = {
  authenticate,
  create,
  groupByConsultant: contactedConsultant,
  addMessage,
  messagesByConsultant,
  getById
};
