import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password required" });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({
            success: true,
            message: "Admin login successful",
            user: {
                _id: "e0f1k1f1a2",
                name: "Kundan Kumar Mandal",
                email: ADMIN_EMAIL,
                role: "admin",
            },
        });
    } else {
        return res.status(401).json({ success: false, message: "password wrong please check it..." });
    }
});

export default router;