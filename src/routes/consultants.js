const express = require('express');

const router = express.Router();
const { vConsultant } = require('../services/validation');
const validateMW = require('../services/validate');
const { authenticate, create } = require('../controller/consultantCtrl');

// Authenticate login
const login = (req, res, next) => {
  authenticate(req.body)
    .then((consultant) => (consultant ? res.json(consultant) : res.status(400).json({ message: 'Email or password is incorrect' })))
    .catch((error) => next(error));
};

// Register new consultant
const register = (req, res, next) => {
  create(req.body)
    .then(() => res.json({ message: 'Registered successfully' }))
    .catch((error) => next(error));
};

// Consultant Routes
router.post('/authenticate', validateMW(vConsultant), login);

router.post('/register', validateMW(vConsultant), register);

// Export Router
module.exports = router;
