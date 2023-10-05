import express from "express";
import {
  deleteCourse,
  getCourse,
  updateCourse,
  createCourse,
} from "../controllers/course.controllers";
import { cheakAdmin } from "../middlewares/cheakAdmin";

const router = express.Router();

router.get("/", getCourse);

router.patch("/:id", cheakAdmin, updateCourse);
router.post("/", cheakAdmin, createCourse);
router.delete("/", cheakAdmin, deleteCourse);

export default router;
