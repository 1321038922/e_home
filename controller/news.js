const {Router} = require("express");
const router = Router();
const news = require("../database/model/news")

router.post("/add",(req, res, next) => {
    const {title, type, img, content, author, desc} = req.body;

    news.create({title, type, img, content, author, desc}).then(data => {
        res.json({
            data: "success",
            code: 200,
            msg: "success"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})
router.post("/get", (req, res, next) => {
    let {id} = req.body;
    news.update({_id: {$in: id}}, {$set: {type: 666}},{multi:true}).then(data => {
        console.log(data)
        res.json({
            data: "success"
        })
    })
})
router.get("/get", (req, res, next) => {
    let {page=1, pageSize=10,id, type} = req.body;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if(!id){
        let params = type == undefined ? {} : {type}

        news.find(params).limit(pageSize).skip((page-1)*pageSize).sort({_id: -1}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    }
    else {
        news.findOne().then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    }
})

router.post("/update", (req, res, next) => {
    const {title, type, img, content, author, desc, id} = req.body;

    news.update({_id: id},{$set: {title, type, img, content, author, desc}}).then(data => {
        res.json({
            data: "success",
            code: 200,
            msg: "更新成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;

    news.remove({_id: id}).then(data => {
        if(data.n > 0){
            res.json({
                data: "success",
                code: 200,
                msg: "删除成功"
            })
        }
        else {
            res.json({
                data: "不存在的id",
                code: 200,
                msg: "不存在的id"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err)
    })
})

module.exports = router;