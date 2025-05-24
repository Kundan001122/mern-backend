import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    father: { type: String, required: true },
    mother: { type: String },
    number: { type: String },
    address: { type: String },
    selectboard10th: { type: String },
    percentage10th: { type: String },
    stream12: { type: String },
    faoccuption: { type: String },
    adcourse: { type: String },
    percentage12th: { type: String },
    adharnumber: { type: String },
    birth: { type: String },
    email: { type: String },
    password: { type: String }
}, { timestamps: true });

const Student = mongoose.model('address', studentSchema)

export default Student;