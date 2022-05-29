'use strict';

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');
const authController = require('../controllers/auth');

// Routes
router.put('/create', authController, gameController.createGame);
router.post('/:idGame/join', authController, gameController.joinGame);

module.exports = router;