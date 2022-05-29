const User = require('../models/user');
const Game = require('../models/game');
const Pawn = require('../models/pawn');

exports.createGame = (req, res) => {
    User.findOne({pseudo: req.body.pseudo})
        .then(user => {
            if (user) {
                Game.findOne({status: 0, $or: [{player1: user._id}, {player2: user._id}]})
                    .then(gameFind => {
                        if (!gameFind) {
                            const game = new Game({
                                player1: user._id
                            });
                            game.save().then(() => res.status(201).json(game))
                                .catch(() => 'cannot create game');
                        } else {
                            res.status(409).json({error : 'you are already in game'});
                        }
                    })
            } else {
                res.status(404).json({error: 'cannot find user'})
            }
        })
}