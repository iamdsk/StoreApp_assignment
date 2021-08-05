var connection = require('./mysqlconnect');

var Orders = function (orders) {
    this.orderDate = orders.orderDate;
    this.customerid = orders.customerid;
    this.amount = this.amount;
}

Orders.getItem = function (result) {
    var items = "select * from item";
    connection.query(items, (err, data) => {
        if (err) {
            result(err);
        }
        else {
            result(data);
        }
    });
}

Orders.createOrder = async function (usernm, result) {
    var cid = "select customerid from customers where username=?"
    // var cust_id;
    let promise = new Promise((resolve, reject) => {
        connection.query(cid, [usernm], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })

    })
    let cust_id = await promise;

    console.log(cust_id);

    var items = "insert into orders(orderdate,customerid) values(curdate()," + parseInt(cust_id[0].customerid) + ")";

    connection.query(items, (err, res) => {
        if (err) {
            result(err);
        }
        else {
            result("Inserted Sucessfully");
        }
    });
}

Orders.billupdate = async function (orderid,result) {
    var orderdetails = "select itemid,quantity from orderitems where orderid=?"//itemid,quantity
    let promise1 = new Promise((resolve, reject) => {
        connection.query(orderdetails, [orderid], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    });
    var details = await promise1;//itemid,quantity
    let total = 0;
    for (var i = 0; i < details.length; i++) {
        let itemdetails = await findname(parseInt(details[i].itemid));//itename,price
        total = total + itemdetails[0].price * details[i].quantity;//calculating bill amount
    }
    console.log(total);
    let updatedAmount = await update(total, orderid);//update the previous amount in the 
    console.log("Updation Sucesfull"+updatedAmount);
    result(null,updatedAmount.toString());
}
var update = async function (total, orderid) {
    var billamt = "update orders set amount=? where orderid=?"
    let promise=new Promise((resolve,reject)=>{
    connection.query(billamt, [total, orderid], (err, res) => {
        if (err) {
           reject(err);
        }
        else {
            resolve( res);
        }
    })
  }) 
let data=await promise;
console.log(total);
return total;

}

var findname = async function (itemid) {
    return new Promise((resolve, reject) => {
        var itemdetails = "select * from item where itemid=?"
        connection.query(itemdetails, [itemid], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

Orders.remove=function(orderid,result){
    var orderCancel="delete from orders where orderid="+orderid;
    connection.query(orderCancel,(err,res)=>{
                if(err){
                    result(err,null)
                }
                else{
                    result(null,res)
                }
    })
}
module.exports = Orders;