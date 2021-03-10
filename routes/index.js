const router = require("express").Router();
const HTML = require("./HTML");
const admin = require("./admin");
//const orders = require("./orders")

router.use("/", HTML);
router.use("/admin", admin);
//router.use("/orders", orders);

module.exports = router;