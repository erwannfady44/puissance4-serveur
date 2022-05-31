const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pawnSchema = mongoose.Schema({
    idPlayer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idGame: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    column: {type:Number, require: true},
    row: {type:Number, require: true},
    color: {type:String, require: true}
});

pawnSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pawn', pawnSchema);