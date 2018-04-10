const  mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/e_home");

const db = mongoose.connection;
db.once("open",()=> {
    console.log("successful connected")
})
