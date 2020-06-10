const express = require('express');
const router = express.Router();

// const path = require('path');

// router.set('views', path.join(__dirname, 'views'));
// router.set('view engine', 'ejs');

// router.use(express.static(path.join(__dirname, 'static')));

// router.use(express.json());
// router.use(express.urlencoded( { extended: true }));

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