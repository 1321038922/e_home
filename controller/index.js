const {Router} = require("express");
const router = Router();
const getData = require("./getData")

router.use("/uploadToken", require("./upload"));
router.use("/category", require("./newsCategory"));
router.use("/news", require("./news"));
router.use("/slide", require("./slider"));
router.get("/getDate", (req, res, next) => {
     getData().then(data => {
        res.json({
            data: data,
            code: 200,
            msg: "success"
        })
     })
});



module.exports = router;
