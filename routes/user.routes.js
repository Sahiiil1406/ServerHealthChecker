const {signUp,
    login,
    logout} = require('../controllers/user');
const express = require('express');
const router = express.Router();


router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;