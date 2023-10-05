import express from "express";
import {
  deleteRoom,
  getRoom,
  updateRoom,
  createRoom,
} from "../controllers/room.controller";

const router = express.Router();

router.get("/", getRoom);
router.patch("/", updateRoom);
router.post("/", createRoom);

router.delete("/", deleteRoom);

export default router;
