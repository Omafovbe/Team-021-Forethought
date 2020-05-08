const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/user');

router.post('/', async (req, res) => {

  //Validates the request body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checks if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  try {
    user = new User(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'phone', 'birth_date']));
    const salt = await bcrypt.genSalt(10);

    //Hashes user's password
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //Generates token and returns it as a header for auto auth
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['firstname', 'lastname', 'email', 'phone', 'birth_date']));

  } catch (error) {

    res.status(500).send(`User could not be saved: ${error}`);

  }

});

module.exports = router;