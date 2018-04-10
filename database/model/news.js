const  mongoose = require("mongoose");

const news = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    type: {
        type: Number,
        require: true
    },
    content: {
        type: String
    },
    desc: {
        type: String
    },
    author: {
        type: String
    }
},{versionKey: false, timestamps: {createAt: "createTime",updateAt: "updateTime"}})

module.exports = mongoose.model("new", news, "news")