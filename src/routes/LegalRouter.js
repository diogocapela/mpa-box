const express = require('express');

const router = express.Router();

router.get('/legal/privacy', (req, res) => {
    res.render('pages/legal/privacy');
});

router.get('/legal/terms', (req, res) => {
    res.render('pages/legal/terms');
});

router.get('/legal/cookies', (req, res) => {
    res.render('pages/legal/cookies');
});

module.exports = router;
