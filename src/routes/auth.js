const express = require('express');
const path = require('path');
const { getById } = require('../controller/userCtrl');

const router = express.Router();

const screeningRoute = (req, res, next) => {
  getById(req.params.id)
    .then((user) => {
      res.locals = user;
      res.sendFile(path.join(__dirname, '../views/interactive', 'index.html'));
    })
    .catch((error) => next(error));
};

router.get('/users/:id/screening', screeningRoute);

router.get('/users/auth', (req, res) => {
  // console.log(req.query.isNew);

  res.render('auth', {
    isNew: false,
    url: '/api/users/authenticate',
    user: true
  });
});

router.get('/users/register', (req, res) => {
  res.render('auth', {
    isNew: true,
    url: '/api/users/register',
    user: true
  });
});


router.get('/consultants/auth', (req, res) => {
  // console.log(req.query.isNew);

  res.render('auth', {
    isNew: false,
    url: '/api/consultants/authenticate',
    user: false
  });
});

module.exports = router;
