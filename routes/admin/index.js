const router = require("express").Router();
const adminRoute = require("./adminRoute");

router.use("/admin", adminRoute);

module.exports = router;