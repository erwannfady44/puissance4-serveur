const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    player: {type: Schema.Types.ObjectId, ref: 'User'},
    game: {type: Schema.Types.ObjectId, ref: 'User'},
    cols: {type:number, require: true},
    rows: {type:number, require: true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Game', userSchema);