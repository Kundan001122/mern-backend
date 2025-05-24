import express from "express";
import { registerUserController, loginUserController } from "../controllers/userController.js";
import { addstudentController, deletestudentController, getAllstudentController, getsinglestudentController, updatestudentController } from "../controllers/studentcontroller.js";


const router = express.Router();

// http://localhost:8000/api/users/register
router.post("/register", registerUserController);

// http://localhost:8000/api/users/check-email
router.post("/check-email", loginUserController);

// http://localhost:8000/api/users/check-email
// router.post("/delete", DeleteController);

//http://localhost:8000/api/users/add-student
router.post("/add-student", addstudentController);

//http://localhost:8000/api/users/get-student
router.get("/get-student", getAllstudentController);

//http://localhost:8000/api/users/get-student-single/:id
router.get("/get-student-single/:id", getsinglestudentController);

//http://localhost:8000/api/users/updatestudent/id
router.put("/updatestudent/:id", updatestudentController);

//http://localhost:8000/api/users/delete-student/id
router.delete("/delete-student/:id", deletestudentController);



export default router;