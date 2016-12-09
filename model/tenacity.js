var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tenacitySchema = new Schema({
    playerId    : {type: Schema.Types.ObjectId,ref:'player'},
    date    : {type: Date},
    runningTenacityPoint: {type: Number},
    weightingTenacityPoint: {type: Number},
    runningSteps: {type: Number},
    weightingSteps: {type: Number}

});

var tenacity = mongoose.model('tenacity', tenacitySchema);

module.exports = tenacity;
