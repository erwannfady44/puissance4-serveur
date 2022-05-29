const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pawnSchema = mongoose.Schema({
    player: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    game: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cols: {type:Number, require: true},
    rows: {type:Number, require: true}
});

pawnSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pawn', pawnSchema);