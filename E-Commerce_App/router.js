var orders=require('./controller/orderscontroller')
var customers=require('./controller/customercontroller.js')
var orderitems=require('./controller/orderitemscontroller')
//const Orders = require('./dal/ordersdal')

module.exports=function(app){
app.route('/api/register')
.post(customers.createCustomer)
.get(customers.customerDetails)

app.route('/api/customers/:username')
.put(customers.customerUpdate)
.delete(customers.customerRemove)
.get(customers.customerDetailByName)

app.route('/api/items')
.get(orders.itemDetails)

app.route('/api/items/:user')
.post(orders.orderCreate)

app.route('/api/orderitems')
.post(orderitems.addItems)//items are adding into the shopping cart

app.route('/api/orders/:id')
.get(orders.bill)//order id
.delete(orders.cancel)
}