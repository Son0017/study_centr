import express from "express";
import {
  deleteCourse,
  getCourse,
  updateCourse,
  createCourse,
  getCourses,
} from "../controllers/course.controllers";
import { cheakAdmin } from "../middlewares/cheakAdmin";

const router = express.Router();

router.get("/", getCourses);
router.get("/home/:id", getCourse);
router.get("/home", getCourse);

router.patch("/:id", cheakAdmin, updateCourse);
router.post("/", cheakAdmin, createCourse);
router.delete("/", cheakAdmin, deleteCourse);

export default router;
