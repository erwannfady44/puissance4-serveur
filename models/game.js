const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    player0: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    player0Connected: {type: Boolean, default: false},
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    player1Connected: {type: Boolean, default: false},
    status: {type:Number, default: 0},
    winner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    currentPlayer: {type: Number, require: true}
});

module.exports = mongoose.model('Game', gameSchema);