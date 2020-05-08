const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const {validateLogin} = require('../middleware/validation');

const { User } = require('../models/user');
const { Consultant } = require('../models/consultant');

router.post('/user', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

router.post('/consultant', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let consultant = await Consultant.findOne({ email: req.body.email });
  if (!consultant) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, consultant.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = consultant.generateAuthToken();
  res.send(token);
});

module.exports = router;
