'use strict';

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');
const authController = require('../controllers/auth');

// Routes
router.put('/create', authController, gameController.createGame);
router.post('/:idGame/join', authController, gameController.joinGame);
router.get('/', gameController.getAllGames);
router.delete('/deleteAllPawns', gameController.deleteAllPawns);
router.delete('/deleteAllGames', gameController.deleteAllGames);

module.exports = router;