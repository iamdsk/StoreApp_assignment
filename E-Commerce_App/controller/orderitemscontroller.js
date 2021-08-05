var order_items=require('../dal/orderitems');
exports.addItems = function(request,response){
    console.log("Accepting orders");
    console.log(request.body.itemname,request.body.quantity);
   order_items.orderItems(request.body.itemname,request.body.quantity,(error,details)=>{
            if(error){
                response.send(error);
            }
            else{
                response.send("Item gets added");
            }
   }); 
}
