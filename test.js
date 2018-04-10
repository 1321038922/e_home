const  request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const iconv = require("iconv-lite")



request("http://cpc.people.com.cn/GB/64162/64165/88453/index.html",{encoding: null},(err, res, body) => {

    var result = iconv.decode(body,"GB2312");
    var $ = cheerio.load(result);

    let h2 = $("h2").each(function() {
        console.log($(this).text())
    })


})
