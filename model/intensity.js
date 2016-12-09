var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var intensitySchema = new Schema({
    playerId    : {type: Schema.Types.ObjectId,ref:'player'},
    date    : {type: Date},
    runningIntensityPoint: {type: Number},
    weightingIntensityPoint: {type: Number},
    avgCaloriesRate: {type: Number},
    avgDistanceRate: {type: Number}

});

var intensity = mongoose.model('intensity', intensitySchema);

module.exports = intensity;
