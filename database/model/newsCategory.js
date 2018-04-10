const mongoose = require("mongoose");

const newsCategory = new mongoose.Schema({
    label: {
        type: String
    },
    value: {
        type: String,
        unique: true
    }
}, {versionKey: false, timestamps: {createAt: "createTime",updateAt: "updateTime"}})

module.exports = mongoose.model("newsCategory", newsCategory)