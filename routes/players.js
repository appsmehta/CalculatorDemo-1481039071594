/**
 * Created by Parth on 08-12-2016.
 */
var mongoose = require('mongoose');
var Player=require('../model/player');

/*
 * Sample JSON Output of getPlayers
 * [{"_id":"5849d1915556b84c744f599c","age":21,"weight":58,"height":180,"playerName":"Shrey Bhatt","__v":0},
 * {"_id":"5849d20172f2912e1cf0461e","age":23,"weight":68,"height":175,"playerName":"John Doe","__v":0},
 * {"_id":"5849d28bbbeb673650d179fa","age":24,"weight":65,"height":168,"playerName":"Parvez Patel","__v":0},
 * {"_id":"5849d2a526a28b14c836b2dd","age":25,"weight":62,"height":175,"playerName":"Parth Upadhyay","__v":0},
 * {"_id":"5849d3375506fe2f00c19110","age":24,"weight":68,"height":165,"playerName":"Apoorv Mehta","__v":0}]
 * */
exports.getPlayers=function(request,response)
{
    console.log("in get players");
    Player.find({},function (err,players)
    {
        if(err)
            console.log(err);
        console.log(players);
        response.send(players);
    });
}



exports.addPlayer=function(request,response)
{
    var newPlayer=new Player();
    newPlayer.playerName="Apoorv Mehta";
    newPlayer.height=165;
    newPlayer.weight=68;
    newPlayer.age=24;
    newPlayer.save(function (err,result)
    {
       if(err)
       {
           console.log(err);
           response.send({statusCode:401});
       }
        else
       {
           console.log(result);
           response.send({statusCode:200,result:result});
       }
    });
}