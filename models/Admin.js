import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    otp: { type: String }, // for forgot password
    otpExpires: { type: Date },
});

export default mongoose.model("Admin", adminSchema);