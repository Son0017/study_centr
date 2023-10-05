import express from "express";
import { createStudentCourse } from "../controllers/studentsCourses.controllers";

const router = express.Router();

router.post("/", createStudentCourse);

export default router;
