import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import studentRoutes from './routes/studentRoutes.js'
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import { updatestudentController } from "./controllers/studentcontroller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ******************Middleware
app.use(cors({
    origin: "https://schoolproject32.netlify.app/", // Netlify site URL
    credentials: true
}));
app.use(express.json());

// ******************Routes
app.use("/api/users", userRoutes);
//******************student routes
app.use("/api/users", studentRoutes);
app.use("/api/users/updatestudent/:id", updatestudentController);

// *****************Root route
app.get("/", (req, res) => {
    res.json({ message: "Server running" });
});

// *****************Connect to MongoDB
connectDB();

// *****************Start server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`.bgRed);
});