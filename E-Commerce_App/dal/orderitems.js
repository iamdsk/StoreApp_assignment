var con=require('./mysqlconnect')
var OrderItems=function(details){
    this.orderi=details.orderid;
    this.itemname=details.itemname;
    this.quantity=details.quantity;
}
OrderItems.orderItems = async function (orderid,itemname, quantity,result) {
        let id = await findid(itemname);
        var orderitem = "insert into orderitems(orderid,itemid,quantity) values(?,?,?)"     
            con.query(orderitem, [parseInt(id[0].itemid), parseInt(quantity)], (err) => {
                if (err) {
                   result(err);
                }
                else {
                   result("Order items inserted sucessfully")
                }
            });
    }
var findid = async function (itemname) {
    var itemid = "select itemid from item where itemname=?";
    let newpromise = new Promise((resolve, reject) => {
        con.query(itemid, [itemname], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
    let id = await newpromise;
    return id;
}

module.exports=OrderItems;