import express from "express";
import {
  deleteTeacher,
  getTeacher,
  updateTeacher,
  createTeacher,
  login,
  getAdmin,
} from "../controllers/teacher.controllers";
import { auth } from "../auth/auth";

const router = express.Router();

router.get("/", auth, getTeacher);
router.get("/admin", auth, getAdmin);
router.patch("/:id", auth, updateTeacher);
router.delete("/", auth, deleteTeacher);
router.post("/", auth, createTeacher);
router.post("/login", login);
export default router;
