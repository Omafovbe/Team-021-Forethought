const express = require('express');
const router = express.Router();

const path = require('path');

router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');

router.use(express.static(path.join(__dirname, 'static')));

router.use(express.json());
router.use(express.urlencoded( { extended: true }));

router.get('/users/auth', (req, res) => {
    // console.log(req.query.isNew);
    const isNewQuery = Boolean(req.query.isNew);
    
    res.render('auth', {
        isNew: isNewQuery
    });
});

module.exports = router;