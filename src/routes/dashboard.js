// import express router into this module
const router = require('express').Router();

// GET route for consultant dashboard
// we should be able to incorporate id into this route
// TODO: /consultant/dashboard/:id
router.get('/consultants/dashboard', (req, res) => {
  res.render('dashboard');
});

// export router
module.exports = router;