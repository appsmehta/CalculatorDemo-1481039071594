var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var frequencySchema = new Schema({
    playerId    : {type: Schema.Types.ObjectId,ref:'player'},
    date    : {type: Date},
    runningFrequencyPoint: {type: Number},
    weightingFrequencyPoint: {type: Number},
    noOfWeightActivity: {type: Number},
    noOfRunActivity: {type: Number}

});

var frequency = mongoose.model('frequency', frequencySchema);

module.exports = frequency;
