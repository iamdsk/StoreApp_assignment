var connection=require('./mysqlconnect');

var Customer=function(customerdetails){
    this.firstname=customerdetails.firstname;
    this.lastname=customerdetails.lastname;
    this.email=customerdetails.email;
    this.password=customerdetails.password;
    this.contactno=customerdetails.contact;
    this.user=customerdetails.user;
}

//insert the data 
Customer.insertdetails=function(data,result){
    var insert="insert into customers(firstname,lastname,email,password,contactno,username) values(?)"
    console.log(data);
    connection.query(insert, [data], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
          }
          else{
            console.log(res.insertId);
            result(null, res.insertId);
          }
    });
}

// get the data of all customers
Customer.getAll = function (response) {
    var select = 'select * from customers';
        connection.query(select,  (error, data) => {
            if (error) {
                response(error,null);
            }
            else {
                response(null,data);
            }
        });
}

//update the data
Customer.update = function (username,result) {
    var updateCustomer = "update customers set firstname='Swapnil'  where user='"+username+"'";
    connection.query(updateCustomer, (error) => {
        if (error) {
            result(error,null);
        }
        result(null,"Data updated sucesfully");
    });
}

//delete the customer record 
Customer.remove = function (username,result) {
    console.log(username);
    var dltCustomer = "delete from customers where user='" + username+"'";
    connection.query(dltCustomer, (error,details) => {
        if (error) {
            result(error,null);
        }else{
            result(null,"record deleted");
        }
    })
}

// get the particular customer data by username
Customer.getByName = function (username,result) {
    var getId = "select * from customers where user='" + username+"'";
        connection.query(getId, (error, result) => {
            if (error) {
              result(error,null);
            }
            else {
                result(null,result);
            } 
        });    
}

Customer.verify =  function (username, password) {
    var verify = " select count(*) 'res' from customers where user='" + username + "'and password='" + password + "'";
    let promise = new Promise((resolve, reject) => {
        con.query(verify, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
    var res = await promise;
    return res;
}
module.exports=Customer;