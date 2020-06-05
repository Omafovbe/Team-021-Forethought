const express = require('express');

const router = express.Router();
const validateMW = require('../services/validate');

const userHandler = require('../controller/userCtrl');
const { authenticate, create } = require('../controller/userCtrl');
const { vUser, vLogin } = require('../services/validation');

// Authenticate user login
const login = (req, res, next) => {
  userHandler.authenticate(req.body)
    .then((user) => (user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' })))
    .catch((error) => next(error));
};

// Register a new user
const register = (req, res, next) => {
  userHandler.create(req.body)
    .then(() => res.json({ message: 'User registered successfully' }))
    .catch((error) => next(error));
};

const insertMessage = (req, res, next) => {
  userHandler.addMessage(req.body)
    .then((mes) => res.json(mes))
    .catch((error) => next(error));
};

// Get all consultants contacted by the user
const getContactedConsultants = (req, res) => {
  userHandler.groupByConsultant(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
};

const getMessages = (req, res) => {
  userHandler.messagesByConsultant(req.body)
    .then((messages) => res.json(messages))
    .catch((error) => res.json(error));
};
// All user routes with validation
router.post('/authenticate', validateMW(vLogin), login);

router.post('/register', validateMW(vUser), register);
router.post('/message', insertMessage);
router.post('/get-messages', getMessages);
router.get('/group/:id', getContactedConsultants);

module.exports = router;
