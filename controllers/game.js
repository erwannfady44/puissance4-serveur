const User = require('../models/user');
const Game = require('../models/game');
const Pawn = require('../models/pawn');

exports.createGame = (req, res) => {
    User.findOne({_id: req.body.idUser})
        .then(user => {
            if (user) {
                Game.findOne({status: 0, $or: [{player1: user._id}, {player2: user._id}]})
                    .then(gameFind => {
                        if (!gameFind) {
                            const game = new Game({
                                player1: user._id,
                                currentPlayer: Math.floor(Math.random())
                            });
                            game.save().then(() => res.status(201).json(game))
                                .catch(() => 'cannot create game');
                        } else {
                            res.status(409).json({error: 'you are already in game'});
                        }
                    })
            } else {
                res.status(404).json({error: 'cannot find user'})
            }
        })
}

exports.joinGame = (req, res) => {
    User.findOne({_id: req.body.idUser})
        .then(user => {
            if (user) {
                Game.findOne({_id: req.params.idGame})
                    .then(game => {
                        if (game) {
                            if (!game.player2) {
                                game.updateOne({
                                    player2: user._id
                                })
                            } else {
                                res.status(409).json({error : 'game is full'})
                            }
                        } else {
                            res.status(404).json({error : 'cannot find game'})
                        }
                    })
            } else {
                res.status(404).json({error : 'cannot find user'});
            }
        })
}