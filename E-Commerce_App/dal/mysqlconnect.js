var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'tiger',
    database:'e_commerce'
});

connection.connect(function(err){
    if(err){
        console.log(err);
        //throw err;
    }
});
module.exports=connection;