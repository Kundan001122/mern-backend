import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    otp: String,
    otpExpires: Date
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;