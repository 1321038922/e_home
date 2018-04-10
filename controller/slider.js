const {Router} = require("express");
const router = Router();
const slider = require("../database/model/slider");

router.post("/add", (req, res, next) => {
    const {title, img, url, isShow, sort} = req.body;

    slider.create({title, img, url, isShow, sort}).then(data => {
        res.json({
            data: "success",
            code: 200,
            msg: "success"
        })
    }).catch(err => {
        new Error(err);
        next(err)
    })
})

router.get("/get", (req, res, next) => {
    let {page=1, pageSize=10, id} = req.body;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if(!id){
        slider.find().limit(pageSize).skip((page-1)*pageSize).sort({sort: 1,_id: -1}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err);
            next(err)
        })
    }
    else {
        slider.findOne({_id: id}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err);
            next(err)
        })
    }
})

router.post("/update", (req, res, next) => {
    const {title, img, url, isShow, sort, id} = req.body;

    slider.update({_id: id},{$set: {title, img, url, isShow, sort}}).then(data => {
        res.json({
            data,
            code: 200,
            msg: "success"
        })
    }).catch(err => {
        new Error(err);
        next(err);
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;

    slider.remove({_id: id}).then(data => {
        console.log(data)
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
                msg: "该id不存在或者已删除"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err);
    })
})

module.exports = router;