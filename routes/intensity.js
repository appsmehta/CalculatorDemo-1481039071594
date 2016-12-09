/**
 * Created by Shrey on 12/8/2016.
 */

var Intensity=require('../model/intensity');
var mongoose = require('mongoose');
var Player=require('../model/player');
var HashMap=require('hashmap');

var ObjectId=require('mongodb').ObjectID;

exports.addIntensity=function(request,response)
{
    console.log("in addIntensity");


    var newIntensity=new Intensity();
    newIntensity.playerId= mongoose.Types.ObjectId('5849d2a526a28b14c836b2dd');
    var makeDate=new Date();

        makedate = new Date(makeDate.setDate(makeDate.getDate() - 2));
        console.log(makeDate);
        newIntensity.date = makeDate;

        newIntensity.runningIntensityPoint = 100;
        newIntensity.weightingIntensityPoint = 110;
        newIntensity.avgCaloriesRate = 110;
        newIntensity.avgDistanceRate = 9;
        console.log(newIntensity);

        newIntensity.save(function (err, result) {
            response.send(result);
        });

}

exports.getWeightingIntensityData=function(request,response)
{

    console.log("in weightingIntensityPoint");
    var currentDate=new Date();
    var makeDate = new Date();
    var resultArray=[];

    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    Intensity.find({})
        .where('date').gt(makeDate).lte(currentDate)
        .populate('playerId')
        .sort('playerId')
        .exec(function (err,result)
        {
            if(!err)
            {

                for(var i=0;i<result.length;i++)
                {
                    if(resultMap.has(result[i].playerId.playerName))
                    {
                        var tempArr=resultMap.get(result[i].playerId.playerName);
                        var tempObj=
                            {
                                date:result[i].date,
                                weightingIntensityPoint:result[i].weightingIntensityPoint
                            }
                        tempArr.push(tempObj);
                        resultMap.remove(result[i].playerId.playerName)
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }
                    else
                    {
                        var tempObj=
                            {
                                date:result[i].date,
                                weightingIntensityPoint:result[i].weightingIntensityPoint
                            }
                        var tempArr=[];
                        tempArr.push(tempObj);
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }

                }

                resultMap.forEach(function(value, key)
                {
                    var obj=
                        {
                            name:key,
                            data:value
                        }
                    resultArray.push(obj);

                });
                response.send(resultArray);            }
            else
                response.send({failed:"failed"});
        });

}



exports.getRunningIntensityData=function(request,response)
{


    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    var resultArray=[];

    Intensity.find({})
        .where('date').gt(makeDate).lte(currentDate)
        .populate('playerId')
        .sort('playerId')
        .exec(function (err,result)
        {
            if(!err)
            {

                for(var i=0;i<result.length;i++)
                {
                    if(resultMap.has(result[i].playerId.playerName))
                    {
                        var tempArr=resultMap.get(result[i].playerId.playerName);
                        var tempObj=
                            {
                                date:result[i].date,
                                runningIntensityPoint:result[i].runningIntensityPoint
                            }
                        tempArr.push(tempObj);
                        resultMap.remove(result[i].playerId.playerName)
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }
                    else
                    {
                        var tempObj=
                            {
                                date:result[i].date,
                                runningIntensityPoint:result[i].runningIntensityPoint
                            }
                        var tempArr=[];
                        tempArr.push(tempObj);
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }

                }

                resultMap.forEach(function(value, key)
                {
                    var obj=
                        {
                            name:key,
                            data:value
                        }
                    resultArray.push(obj);

                });
                response.send(resultArray);            }
            else
                response.send({failed:"failed"});
        });

}

exports.getAvgCaloriesRateData=function(request,response)
{


    console.log("in avgCaloriesRate");

    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    var resultArray=[];
    Intensity.find({})
        .where('date').gt(makeDate).lte(currentDate)
        .populate('playerId')
        .sort('playerId')
        .exec(function (err,result)
        {
            if(!err)
            {

                for(var i=0;i<result.length;i++)
                {
                    if(resultMap.has(result[i].playerId.playerName))
                    {
                        var tempArr=resultMap.get(result[i].playerId.playerName);
                        var tempObj=
                            {
                                date:result[i].date,
                                avgCaloriesRate:result[i].avgCaloriesRate
                            }
                        tempArr.push(tempObj);
                        resultMap.remove(result[i].playerId.playerName)
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }
                    else
                    {
                        var tempObj=
                            {
                                date:result[i].date,
                                avgCaloriesRate:result[i].avgCaloriesRate
                            }
                        var tempArr=[];
                        tempArr.push(tempObj);
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }

                }
                resultMap.forEach(function(value, key)
                {
                    var obj=
                    {
                        name:key,
                        data:value
                    }
                    resultArray.push(obj);

                });
                response.send(resultArray);
            }
            else
                response.send({failed:"failed"});
        });


}


exports.getAvgDistanceRateData=function(request,response)
{

    console.log("in getAvgDistanceRateData");

    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    var resultArray=[];
    Intensity.find({})
        .where('date').gt(makeDate).lte(currentDate)
        .populate('playerId')
        .sort('playerId')
        .exec(function (err,result)
        {
            if(!err)
            {

                for(var i=0;i<result.length;i++)
                {
                    if(resultMap.has(result[i].playerId.playerName))
                    {
                        var tempArr=resultMap.get(result[i].playerId.playerName);
                        var tempObj=
                            {
                                date:result[i].date,
                                avgDistanceRate:result[i].avgDistanceRate
                            }
                        tempArr.push(tempObj);
                        resultMap.remove(result[i].playerId.playerName)
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }
                    else
                    {
                        var tempObj=
                            {
                                date:result[i].date,
                                avgDistanceRate:result[i].avgDistanceRate
                            }
                        var tempArr=[];
                        tempArr.push(tempObj);
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }

                }
                resultMap.forEach(function(value, key)
                {
                    var obj=
                    {
                        name:key,
                        data:value
                    }
                    resultArray.push(obj);

                });

                response.send(resultArray);
            }
            else
                response.send({failed:"failed"});
        });



}

exports.getPlayerIntensityData=function (request,response)
{
    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultArr=[];
    var playerId=request.param("playerId");
    Intensity.find({'playerId':mongoose.Types.ObjectId(playerId)})
        .where('date').gt(makeDate).lte(currentDate)
        .populate('playerId')
        .exec(function (err,result)
        {
            if(!err)
            {
                console.log(result);
                for(var i=0;i<result.length;i++)
                {
                    var obj=
                    {
                        points:result[i].runningIntensityPoint,
                        date:result[i].date
                    }
                    resultArr.push(obj);
                }
                response.send(resultArr);
            }
        });
}