import express from "express";
import {
  deleteStudentDebt,
  getStudentDebt,
  updateStudentDebt,
  createStudentDebt,
} from "../controllers/studentDebt.controllers";
import { cheakAdmin } from "../middlewares/cheakAdmin";

const router = express.Router();

router.get("/", getStudentDebt);
router.get("/:id", getStudentDebt);
router.patch("/:id", updateStudentDebt);
router.post("/:id", createStudentDebt);
router.post("/", createStudentDebt);
router.delete("/", deleteStudentDebt);

export default router;
