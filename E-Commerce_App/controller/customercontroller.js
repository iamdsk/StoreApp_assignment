var customer = require('../dal/customerdal');

//insert the data into the customer table
exports.createCustomer = function (request, response) {
    customer.insertdetails(request.body, function (error, customer) {
        if (error)
            response.send(error);
        response.json(customer);
    });
}

// fetch all customers data 
exports.customerDetails = function (request, res) {
    customer.getAll(function (error, details) {
                if(error){
                    res.send(error);
                }
                else{
                    res.send(details);
                }
    });
}

//update the data
exports.customerUpdate=function(request,res){
    customer.update(request.params.username,function(error,details){
                    if(error){
                        res.send(error);
                    }
                    else{
                        res.send("Information updated sucessfully !");
                    }
    });
}

//Delete the data of customer 
exports.customerRemove=function(request,response){
    customer.remove(request.params.username,function(error,details){
                    if(error){
                        response.send(error);
                    }
                    else{
                        response.send("user deleted sucessfully");
                    }
    })
}

//Get customer details by the username
exports.customerDetailByName=function(request,response){
    customer.getByName(request.params.username,function(error,details){
                if(error){
                    response.send(error);
                }
                else{
                    response.json(details);
                }
    })
}


