const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

// POST sign-in
router.post('/login', users_controller.post_login);

// POST sign-up
router.post('/register', users_controller.post_register);

module.exports = router;