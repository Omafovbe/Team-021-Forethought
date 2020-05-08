const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Consultant } = require('../models/consultant');
const { validateConsultant } = require('../middleware/validation');

router.post('/', async (req, res) => {

  //Validates the request body
  const { error } = validateConsultant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checks if consultant already exists
  let consultant = await Consultant.findOne({ email: req.body.email });
  if (consultant) return res.status(400).send('consultant already registered');

  try {
    consultant = new Consultant(_.pick(req.body, ['firstname', 'lastname', 'email', 'password', 'phone', 'certification', 'workplace']));
    const salt = await bcrypt.genSalt(10);

    //Hashes consultant's password
    consultant.password = await bcrypt.hash(consultant.password, salt);
    await consultant.save();

    //Generates token and returns it as a header for auto auth
    const token = consultant.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(consultant, ['firstname', 'lastname', 'email', 'phone', 'certification', 'workplace']));

  } catch (error) {

    res.status(500).send(`Consultant could not be saved: ${error}`)

  }

});

module.exports = router;