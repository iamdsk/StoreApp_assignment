const e = require('express');
const Orders = require('../dal/ordersdal');
//var orders=require('../dal/ordersdal');

exports.itemDetails=function(request,response){
    Orders.getItem(function(err,details){
        if(err){
            response.send(err);
        }
        else{
            response.send(details);
        }
    })
}

exports.orderCreate=function(request,response){
    Orders.createOrder(request.params.username,function(error,details){
        if(error){
            response.send(error);
        }
        else{
            response.send("Taking order");
        }
    })
}

exports.bill=function(request,response){
    console.log(request.params.id);
 Orders.billupdate(request.params.id,(err,result)=>{       
    if(err){
        response.send(err)
    }
    response.send(result);        
 });
}

exports.cancel=function(request,response){
    console.log(request.params.id);
    Orders.remove(request.params.id,(err,result)=>{
        if(err){
            response.send(err)
        }
        else{
            response.send(result);
        }
    })
}