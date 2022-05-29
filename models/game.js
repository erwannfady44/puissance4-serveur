const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    player1: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    player2: {type: Schema.Types.ObjectId, ref: 'User'},
    status: {type:number, default: 0},
    winner: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Game', userSchema);