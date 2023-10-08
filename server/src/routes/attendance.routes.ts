import express from "express";
import {
  createStudent,
  getStudentAttendance,
} from "../controllers/attendance.controllers";

const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudentAttendance);

export default router;
