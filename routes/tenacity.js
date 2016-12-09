/**
 * Created by Shrey on 12/8/2016.
 */

var mongoose = require('mongoose');
var Player=require('../model/player');
var Tenacity=require('../model/tenacity');
var HashMap=require('hashmap');

exports.addTenacity=function(request,response)
{
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    var playerId=[];
    playerId.push('5849d2a526a28b14c836b2dd');
    playerId.push('5849d28bbbeb673650d179fa');
    playerId.push('5849d20172f2912e1cf0461e');
    playerId.push('5849d1915556b84c744f599c');
    playerId.push('5849d3375506fe2f00c19110');

    for(var i=0;i<playerId.length;i++)
    {

        var newTenacityData=new Tenacity();
        newTenacityData.playerId=mongoose.Types.ObjectId(playerId[i]);
        newTenacityData.date=Date.parse(makeDate);
        newTenacityData.runningTenacityPoint=100;
        newTenacityData.weightingTenacityPoint=80;
        newTenacityData.runningSteps=6000;
        newTenacityData.weightingSteps=40;
        newTenacityData.save(function (err,result)
        {
            if(err)
            {
                console.log(err);
                response.send({statusCode:401});
            }
            else
            {
                console.log(result);

            }
        });
    }
    response.send({statusCode:200});

}
exports.getRunningTenacityData=function(request,response)
{



    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    var resultArray=[];
    Tenacity.find({})
        .where('date').gt(makeDate).lte(currentDate)
        .where('runningSteps').gt(3000)
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
                                runningSteps:result[i].runningSteps
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
                                runningSteps:result[i].runningSteps
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
exports.getWeightingTenacityData=function(request,response)
{

    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    var resultArray=[];
    Tenacity.find({})
        .where('date').gt(makeDate).lte(currentDate)
        .where('weightingSteps').gt(30)
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
                                weightingSteps:result[i].weightingSteps
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
                                weightingSteps:result[i].weightingSteps
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

exports.getRunningTenacityDistribution=function(request,response)
{
    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultMap=new HashMap();
    var veryLow=0,low=0,medium=0,high=0;
    Tenacity.find({})
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
                            runningSteps:result[i].runningSteps
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
                            runningSteps:result[i].runningSteps
                        }
                        var tempArr=[];
                        tempArr.push(tempObj);
                        resultMap.set(result[i].playerId.playerName,tempArr);
                    }
                }
                resultMap.forEach(function(value, key) {
                    console.log(key + " : " + value);
                    var total = 0;
                    for (var i = 0; i < value.length; i++) {
                        total = total + value[i].runningSteps;
                    }
                    var average = total / (value.length + 1)
                    //distArr.push({name:key,average:average});
                    if (average <= 2000) {
                        veryLow++;
                    }
                    else if (average > 2000 && average <= 4000) {
                        low++;
                    }
                    else if (average > 4000 && average <= 6000) {
                        medium++;
                    }
                    else if (average > 6000) {
                        high++;
                    }

                });

                response.send({veryLow:veryLow,low:low,medium:medium,high:high});
            }
            else
                response.send({failed:"failed"});
        });

}


exports.getPlayerTenacityData=function (request,response)
{
    var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
    var resultArr=[];
    var playerId=request.param("playerId");
    Tenacity.find({'playerId':mongoose.Types.ObjectId(playerId)})
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
                        points:result[i].runningTenacityPoint,
                        date:result[i].date
                    }
                    resultArr.push(obj);
                }
                response.send(resultArr);
            }
        });
}

exports.getWeightingTenacityDistribution=function(request,response)
    {
        var currentDate=new Date();
    var makeDate = new Date();
    makeDate = new Date(makeDate.setDate(makeDate.getDate() - 7));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(makeDate));
   var resultMap=new HashMap();
    var veryLow=0,low=0,medium=0,high=0;
    Tenacity.find({})
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
                                    weightingSteps:result[i].weightingSteps
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
                                    weightingSteps:result[i].weightingSteps
                            }
                        var tempArr=[];
                        tempArr.push(tempObj);
                       resultMap.set(result[i].playerId.playerName,tempArr);
                    }
                }
                resultMap.forEach(function(value, key) {
                        console.log(key + " : " + value);
                        var total = 0;
                        for (var i = 0; i < value.length; i++) {
                                total = total + value[i].weightingSteps;
                            }
                        var average = total / (value.length + 1)
                            if (average <= 20) {
                                veryLow++;
                            }
                        else if (average > 20 && average <= 40) {
                                low++;
                            }
                        else if (average > 40 && average <= 60) {
                                medium++;
                            }
                        else if (average > 60) {
                                high++;
                            }

                        });

                    response.send({veryLow:veryLow,low:low,medium:medium,high:high});
            }
            else
                response.send({failed:"failed"});
        });

    }