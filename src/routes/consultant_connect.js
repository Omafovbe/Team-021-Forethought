const router = require('express').Router();

router.get('/consultants/profile', (req, res) => {
  res.render('consultant');
})

// replace route with /users/:userid/connect
router.get('/users/connect', (req, res) => {
  res.render('consultant_connect');
});

module.exports = router;