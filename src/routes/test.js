const express = require('express');

const router = express.Router();
const validation = require('../services/validation');
const validateMW = require('../services/validate');
const { testCalculate, getMentalResults } = require('../controller/testCtrl');

// Know the user mental health status from test taken and saved to database
const userTestStatus = (req, res) => {
  testCalculate(req.body)
    .then((details) => res.json({ details }))
    .catch((error) => res.status(400).json({ message: error.message }));
};

// Retrive the result of all mental health test taken by a user
const getResults = (req, res) => {
  getMentalResults(req.params.id)
    .then((result) => res.json({ result }))
    .catch((error) => res.status(400).json({ message: error.message }));
};


// Route to know the mental status and save test result
router.post('', validateMW(validation.vTest), userTestStatus);

// Display test result for a user
router.get('/results/:id', getResults);


module.exports = router;
