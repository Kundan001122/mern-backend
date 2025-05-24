import Student from "../models/addstudent.js";

// Create a new student (Add)
export async function addstudentController(req, res) {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: "Error adding student", details: err.message });
    }
};

// Get all students (List)
export async function getAllstudentController(req, res) {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Error fetching students", details: err.message });
    }
};

// Get a single student by id
export async function getsinglestudentController(req, res) {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: "Error fetching student", details: err.message });
    }
};

// Update a student
export const updatestudentController = async(req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated", student });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Delete a student
export async function deletestudentController(req, res) {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting student", details: err.message });
    }
};