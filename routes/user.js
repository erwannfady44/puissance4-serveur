'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);

module.exports = router;
