const router = require("express").Router();
const Admin = require("../../models/Admin");
const nanoid = require("nanoid");

router.get("/", (req, res) => {
    Admin.findAll().then((data) => {
        res.json(data);
    });
});

router.post("/", async (req, res) => {
    const body = req.body;
    body.admin_id = nanoid.nanoid(12);
    const admin = await Admin.create(body);
    res.json(admin);
});

module.exports = router;