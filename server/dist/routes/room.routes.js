"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controllers/room.controller");
const router = express_1.default.Router();
router.get("/", room_controller_1.getRoom);
router.patch("/", room_controller_1.updateRoom);
router.post("/", room_controller_1.createRoom);
router.delete("/", room_controller_1.deleteRoom);
exports.default = router;
