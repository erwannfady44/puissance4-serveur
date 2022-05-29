const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    nbGames: {type: Number, require: false},
    nbWin: {type: Number, require: false}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);