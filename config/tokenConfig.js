module.exports = {
    secret: "yao",
    exp() {
        return Math.round(Date.now()/1000)+3600*24*7
    }
}