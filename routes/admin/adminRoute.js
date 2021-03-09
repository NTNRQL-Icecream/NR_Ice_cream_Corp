const router = require("express").Router();
const Admin = require("../../models/Admin");
const nanoid = require("nanoid");

router.get("/", (req, res) => {
    const { user, pass } = req.query;
    Admin.findOne({
        where: {
            username: user,
            password: pass
        },
        attributes: {
            exclude: "password"
        }
    }).then((adminData) => {
        if (adminData) {
            res.status(200).json(adminData);
        } else {
            res.status(404).send("Incorrect login info")
        }
    })
});

router.post("/", async (req, res) => {
    const body = req.body;
    body.admin_id = nanoid.nanoid(12);
    const admin = await Admin.create(body);
    res.json(admin);
});

module.exports = router;