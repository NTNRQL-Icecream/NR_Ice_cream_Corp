const router = require("express").Router();
const HTMLRoutes = require("./HTMLRoutes");

router.use("/", HTMLRoutes);

module.exports = router;