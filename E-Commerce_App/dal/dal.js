var dataop;
var con = require('./mysqlconnect.js');

exports.createOrder = async function (username) {
    var cid = "select customerid from customers where username=?"
    let promise1 = new Promise((resolve, reject) => {
        con.query(cid, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })

    })
    let cust_id = await promise1;
    console.log(cust_id);


    var items = "insert into orders(orderdate,customerid) values(curdate()," + parseInt(cust_id[0].customerid) + ")";
    let promise2 = new Promise((resolve, reject) => {
        con.query(items, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Inserted Sucessfully");
            }
        })
    })
    dataop = await promise2;
    return dataop;
}
exports.orderItems = async function (itemname, quantity) {

    let id = await findid(itemname);
    console.log(id);
    console.log(quantity);
    var orderitem = "insert into orderitems(itemid,quantity) values(?,?)"
    let promise2 = new Promise((resolve, reject) => {
        con.query(orderitem, [parseInt(id[0].itemid), parseInt(quantity)], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Order Items Select sucessfully")
            }
        })
    })
    let msg = await promise2;
    return msg;

}
exports.process = async function (orderid) {
    var orderdetails = "select itemid,quantity from orderitems where orderid=?"//itemid,quantity
    let promise1 = new Promise((resolve, reject) => {
        con.query(orderdetails, [orderid], (err, result) => {
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
    let updatedAmount = await bill(total,orderid);//update the previous amount in the bill
    return total;
}
var bill = async function (total, orderid) {
    var billamt = "update orders set amount=? where orderid=?"
    let promise1 = new Promise((resolve, reject) => {
        con.query(billamt, [total, orderid], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Total Bill Amount");
            }
        })
    })
    let totalamt = await promise1;
    return totalamt;
}
var findid = async function (itemname) {
    var itemid = "select itemid from items where itemname=?";
    let promise1 = new Promise((resolve, reject) => {
        con.query(itemid, [itemname], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
    let id = await promise1;
    return id;
}

var findname = async function (itemid) {
    return new Promise((resolve, reject) => {
        var itemdetails = "select * from items where itemid=?"
        con.query(itemdetails, [itemid], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}