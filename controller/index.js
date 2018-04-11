const {Router} = require("express");
const router = Router();
const getData = require("./getData");
const jwt = require("express-jwt")

router.use("/uploadToken", require("./upload"));
router.use("/category", require("./newsCategory"));
router.use("/news", jwt({secret: "yao"}),require("./news"));
router.use("/slide", require("./slider"));
router.use("/user", require("./user"))
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
