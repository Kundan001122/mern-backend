import express from "express";
import { getsinglestudentController } from "../controllers/studentcontroller.js";

const router = express.Router();

router.get("/updatestudent/:id", getsinglestudentController);

export default router;