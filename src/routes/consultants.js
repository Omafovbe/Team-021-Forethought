const express = require('express');

const router = express.Router();
const { vConsultant } = require('../services/validation');
const validateMW = require('../services/validate');
const consultant = require('../controller/consultantCtrl');

// Authenticate login
const login = (req, res, next) => {
  consultant.authenticate(req.body)
    .then((token) => (token ? res.json(token) : res.status(400).json({ message: 'Email or password is incorrect' })))
    .catch((error) => next(error));
};

// Register new consultant
const register = (req, res, next) => {
  consultant.create(req.body)
    .then(() => res.json({ message: 'Registered successfully' }))
    .catch((error) => next(error));
};

const insertMessage = (req, res, next) => {
  consultant.addMessage(req.body)
    .then((mes) => res.json(mes))
    .catch((error) => next(error));
};

// Get all users contacted by consultant
const getContactedUsers = (req, res) => {
  consultant.contactedUsers(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};

const getMessages = (req, res) => {
  consultant.messagesByUser(req.body)
    .then((messages) => res.json(messages))
    .catch((error) => res.json(error));
};

// Consultant Routes
router.post('/authenticate', validateMW(vConsultant), login);

router.post('/register', validateMW(vConsultant), register);
router.post('/message', insertMessage);
router.post('/get-messages', getMessages);
router.get('/group/:id', getContactedUsers);

// Export Router
module.exports = router;
