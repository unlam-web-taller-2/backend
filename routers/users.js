const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/usersController');

// POST sign-in
router.post('/sign-in', users_controller.sign_in_post);

// POST sign-up
router.post('/sign-up', users_controller.sign_up_post);

module.exports = router;