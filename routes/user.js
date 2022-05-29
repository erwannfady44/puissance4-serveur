'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Routes
router.post('/signUp', userController.signup);
router.post('/logIn', userController.login);

module.exports = router;
