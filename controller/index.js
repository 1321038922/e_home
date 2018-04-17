const {Router} = require("express");
const router = Router();
const getData = require("./getData");
const jwt = require("express-jwt");
const tokenConfig = require("../config/tokenConfig");
const getToken = require("./function/getToken")

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
router.use("/commonDiscuss",//民主评议
    jwt({
        secret: tokenConfig.secret,
        credentialsRequired:false,
        getToken: getToken
    }),
    require("./commonDiscuss"));

router.use("/branch", require("./branch"));
router.use("/personalSummary",
    jwt({
        secret: tokenConfig.secret,
        credentialsRequired:false,
        getToken: getToken
    }),
    require("../controller/personalSummary"));

router.use("/invitation", require("../config/jwtVerify"));
router.use("/invitation", require("./invitation"))


module.exports = router;
