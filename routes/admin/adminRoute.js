const router = require("express").Router();
const Admin = require("../../models/Admin");
const nanoid = require("nanoid");

router.get("/login", async (req, res) => {
    try {
        const { user, pass } = req.query;
        const adminData = await Admin.findOne({
            where: {
                username: user,
            },
        });

        // Check if not found
        if (!adminData) {
            res.status(404).json({
                message: "Incorrect username or password."
            });
            return
        }
        // Check if valid password
        const validPass = await adminData.passwordCheck(pass);
        if (!validPass) {
            res
                .status(404)
                .json({ message: "incorrect username or password." });
            return;
        }
        res.json({ admin: adminData, message: "Successful login" });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        body.admin_id = nanoid.nanoid(12);
        const admin = await Admin.create(body);

        res.status(201).json(admin);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;