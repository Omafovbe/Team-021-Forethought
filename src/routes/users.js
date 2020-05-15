const express = require('express');

const router = express.Router();
const validateMW = require('../services/validate');
const { authenticate, create } = require('../controller/userCtrl');
const { vUser } = require('../services/validation');

// Authenticate user login
const login = (req, res, next) => {
  authenticate(req.body)
    .then((user) => (user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' })))
    .catch((error) => next(error));
};

// Register a new user
const register = (req, res, next) => {
  create(req.body)
    .then(() => res.json({ message: 'User registered successfully' }))
    .catch((error) => next(error));
};


// All user routes with validation
router.post('/authenticate', validateMW(vUser), login);

router.post('/register', validateMW(vUser), register);

module.exports = router;
