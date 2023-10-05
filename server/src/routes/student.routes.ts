import express from "express";
import {
  deleteStudent,
  getStudent,
  updateStudent,
  createStudent,
} from "../controllers/student.controllers";
import { cheakAdmin } from "../middlewares/cheakAdmin";

const router = express.Router();

router.get("/", getStudent);
router.get("/:id", getStudent);
router.patch("/:id", cheakAdmin, updateStudent);
router.delete("/:id", cheakAdmin, deleteStudent);
router.post("/", cheakAdmin, createStudent);

export default router;
