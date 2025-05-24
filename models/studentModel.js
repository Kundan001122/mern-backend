import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    father: String,
    mother: String,
    number: String,
    address: String,
    selectboard10th: String,
    percentage10th: String,
    stream12: String,
    faoccuption: String,
    adcourse: String,
    percentage12th: String,
    adharnumber: String,
    birth: String,
    email: String,
    password: String,
});

const Students = mongoose.model("Student", studentSchema);
export default Students;