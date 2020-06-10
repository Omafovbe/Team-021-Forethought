const express = require('express');
const router = express.Router();

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
})

router.get('/consultants/auth', (req, res) => {
    // console.log(req.query.isNew);
    
    res.render('auth', {
        isNew: false,
        url: '/api/consultants/authenticate',
        user: false
    });
});

module.exports = router;