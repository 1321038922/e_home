const mongoose = require("mongoose");

const user = new mongoose.Schema({
    userName: {
        type: String
    },
    idCardNumber: {
        type: String
    },
    pwd: {
        type: String
    }
}, {versionKey: false})

module.exports = mongoose.model("user", user)