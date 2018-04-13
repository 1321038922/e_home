const {Router} = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const score = require("../database/model/score");



router.post("/login", (req, res) => {
    let {userName,pwd} = req.body;

    if(userName == "yao"&&pwd == "123"){
        res.json({
            data: jwt.sign({
                data:{
                    userId: "huashan007"
                },
                exp: Math.round(Date.now()/1000) +3600
            },"yao")
        })
        score.create({type: 1, score: 5,typeName: "登录", userId: "huashan007"}).then(data => {
            console.log(data)
        })
    }
    else {
        res.json({
            data: '用户名密码不正确'
        })
    }

})

router.post("/getUserInfo",(req, res) => {
    let { token } = req.body || req.query
    jwt.verify(token,'yao',(err, decode) => {
        if(err){
            res.status(401).send("登录状态失效，请重新登录");
        }
        else {
            console.log(decode)
            res.json({
                userName: "姚君荣",
                avatar: 'https://avatars2.githubusercontent.com/u/30630780?s=460&v=4'
            })
        }
    })
})

module.exports = router;