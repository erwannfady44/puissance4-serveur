const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {type:Number, default: 0},
    winner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    currentPlayer: {type: Number, require: true}
});

module.exports = mongoose.model('Game', gameSchema);