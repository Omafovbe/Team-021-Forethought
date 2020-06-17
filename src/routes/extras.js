const router = require('express').Router();

// replace route with /users/:userid/connect
router.get('/emergency', (req, res) => {
  res.render('emergency');
});

router.get('/about', (req, res) => {
  res.render('about');
})

module.exports = router;