const router = require('express').Router();

// replace route with /users/:userid/connect
router.get('/emergency', (req, res) => {
  res.render('emergency');
});

module.exports = router;
