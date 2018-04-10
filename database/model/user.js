const mongoose = require("mongoose");

const user = new mongoose.Schema({

}, {versionKey: false})

module.exports = mongoose.model("user", user)