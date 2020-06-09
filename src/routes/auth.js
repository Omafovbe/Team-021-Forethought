const express = require('express');

const router = express.Router();


router.get('/auth', (req, res) => {
  // console.log(req.query.isNew);
  const isNewQuery = Boolean(req.query.isNew);

  res.render('auth', {
    isNew: isNewQuery
  });
});

module.exports = router;
