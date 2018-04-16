const {Router} = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const user = require("../database/model/user");
const tokenConfig = require("../config/tokenConfig")

//创建用户
router.post("/add", (req, res, next) => {
    let token = req.headers.token || req.body.token || req.query.token;
    jwt.verify(token, tokenConfig.secret, (err, decode) => {
        if(err){
            res.status(401).send("登录状态失效，请重新登录");
            return
        }
        if(decode.level.type == 0){ //管理员
            let {
                avatar,
                userName,
                idCardNumber,
                homeAddress,
                workAddress,
                nation,
                weChat,
                qqNumber,
                sex,
                education,
                jobTitle,
                emolument,
                enterPartyTime,
                paymentTime,
                partyStatus,
                pwd,
                phone,
                level
            } = req.body;

            user.findOne({idCardNumber}).then(dt  => {
                if(dt === null) {
                    user.create({
                        avatar,
                        userName,
                        idCardNumber,
                        homeAddress,
                        workAddress,
                        nation,
                        weChat,
                        qqNumber,
                        sex,
                        education,
                        jobTitle,
                        emolument,
                        enterPartyTime,
                        paymentTime,
                        partyStatus,
                        pwd,
                        phone,
                        level
                    }).then(data => {
                        res.json({
                            data: "success",
                            code: 200,
                            msg: '用户添加成功'
                        })
                    }).catch(err => {
                        let error = new Error(err);
                        next(error)
                    })
                }
                else {
                    res.json({
                        data: '用户名已存在',
                        code: 400,
                        msg: '用户名已存在'
                    })
                }
            }).catch(error => {
                next(new Error(error))
            })
        }
    })
})



router.post("/login", (req, res, next) => {
    let {idCardNumber,pwd} = req.body;

    user.findOne({idCardNumber}).then(data => {
        if(data === null){
            res.json({
                data: "用户名不存在",
                code: 400,
                msg: "false"
            })
            return
        }

        if(data.pwd === pwd){
            let userInfo = {
                id: data._id,
                name: data.userName,
                idCardNumber: data.idCardNumber,
                level: data.level
            }
            let token = jwt.sign(userInfo,tokenConfig.secret, {expiresIn: tokenConfig.exp()})
            res.json({
                data: token,
                code: 200,
                msg: "success"
            })
        }
        else {
            res.json({
                data: "用户名或密码错误",
                code: 400,
                msg: "用户名或密码错误"
            })
        }
    }).catch(err => {
        let error = new Error(err);
        next(error)
    })
})

router.get("/get", (req, res, next) => { //管理员获取用户列表
    let token = req.body.token || req.headers.token || req.query.token;
    let {page=1, pageSize=10, id} = req.query;
    jwt.verify(token, tokenConfig.secret, (err, decode ) => {
        if(err){
            res.status(401).send("登录状态失效，请重新登录");
            return
        }
        if(decode.level.type == 0){   //管理员获取用户信息
            if(!id){
                user.find({},{pwd: 0}).sort({_id: -1}).limit(pageSize).skip((page-1)*pageSize).then(data => {
                    res.json({
                        data,
                        code: 200,
                        msg: "success"
                    })

                })
            }
            else {
                user.findOnd({_id: id}).then(data => {
                    res.json({
                        data,
                        code: 200,
                        msg: "success"
                    })
                })
            }
        }
        else {
            let  err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    })
})

router.post("/updateMore", (req, res, next) => {    //管理员批量重置密码
    let {users} = req.body;
    console.log(users)
    user.update({_id: {$in: users}},{pwd: "123456"},{multi: true}).then(data => {
        if(data.n == users.length){
            res.json({
                data: "批量重置密码成功",
                code: 200,
                msg: "批量重置密码成功"
            })
        }

    })
})



router.post("/getUserInfo",(req, res, next) => {  //普通用户获取个人信息
    let token = req.body.token || req.headers.token || req.query;
    jwt.verify(token,tokenConfig.secret,(err, decode) => {
        if(err){
            res.status(401).send("登录状态失效，请重新登录");
            return
        }
        user.findOne({_id: decode.id},{pwd: 0,level: 0,isCanLogin: 0}).then(data => {
            res.json({
                data,
                code: 200,
                msg: 'success'
            })
        }).catch(err => {
            next(new Error(err))
        })

    })
})

module.exports = router;