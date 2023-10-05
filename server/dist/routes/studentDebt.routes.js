"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentDebt_controllers_1 = require("../controllers/studentDebt.controllers");
const router = express_1.default.Router();
router.get("/", studentDebt_controllers_1.getStudentDebt);
router.get("/:id", studentDebt_controllers_1.getStudentDebt);
router.patch("/:id", studentDebt_controllers_1.updateStudentDebt);
router.post("/:id", studentDebt_controllers_1.createStudentDebt);
router.post("/", studentDebt_controllers_1.createStudentDebt);
router.delete("/", studentDebt_controllers_1.deleteStudentDebt);
exports.default = router;
