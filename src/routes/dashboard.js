// import express router into this module
const router = require('express').Router();

// GET route for consultant dashboard
// we should be able to incorporate id into this route
// TODO: /consultant/dashboard/:id
router.get('/consultants/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/consultants/dashboard/patients', (req, res) => {
  // query the database to find patients
  res.render('patients');
});

router.get('/consultants/dashboard/appointments', (req, res) => {
  // query the database to find appointments
  res.render('appointments');
});

router.get('/consultants/dashboard/connections', (req, res) => {
  // query the database to find connections
  res.render('connections');
});

// export router
module.exports = router;