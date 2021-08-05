var dal = require('./dal/dal.js')
const express = require("express");

var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//router
app.get("/", (request, response) => {
    response.sendFile(__dirname + "index.html");
    response.end();
})

var router=require('./router');
router(app);

app.listen(8080);
console.log("Listening on the port number 8080 ! ");