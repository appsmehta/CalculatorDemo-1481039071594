var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    playerName    : {type: String},
    height    : {type: Number},
    weight       : {type: Number},
    age       : {type: Number}


});

var player = mongoose.model('player', playerSchema);

module.exports = player;