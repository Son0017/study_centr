import express from "express";
import {
  createStudentCourse,
  getStudentCourse,
  deleteStudentCourse,
} from "../controllers/studentsCourses.controllers";

const router = express.Router();

router.post("/", createStudentCourse);
router.get("/:id", getStudentCourse);
router.delete("/:id", deleteStudentCourse);

export default router;
