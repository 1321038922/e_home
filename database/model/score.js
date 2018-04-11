const mongoose = require("mongoose");

const score = new mongoose.Schema({
    type: {
        type: Number
    },
    score: {
        type: Number
    },
    userId: {
        type: String
    },
    scoreName: {
        type: String
    }
}, {versionKey: false, timestamp: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("score", score)