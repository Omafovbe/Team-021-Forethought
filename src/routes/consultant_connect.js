const router = require('express').Router();

// replace route with /users/:userid/connect
router.get('/users/connect', (req, res) => {
  res.render('consultant_connect');
});

module.exports = router;