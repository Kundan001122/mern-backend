import User from "../models/user.js";
import bcrypt from "bcrypt";

//REGISTER CONTROLLER
export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ message: "Server error during registration" });
    }
}

//LOGIN CONTROLLER
export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const { _id, name, email: userEmail } = user;

        res.status(200).json({
            message: "Login successful",
            user: { _id, name, email: userEmail },
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Server error during login" });
    }
}