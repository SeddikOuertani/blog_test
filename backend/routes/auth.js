const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth');

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login );

// LOGOUT
router.post('/logout', logout );

module.exports = router;
