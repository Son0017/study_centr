"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controllers_1 = require("../controllers/student.controllers");
const cheakAdmin_1 = require("../middlewares/cheakAdmin");
const router = express_1.default.Router();
router.get("/", student_controllers_1.getStudent);
router.get("/:id", student_controllers_1.getStudent);
router.patch("/:id", cheakAdmin_1.cheakAdmin, student_controllers_1.updateStudent);
router.delete("/:id", cheakAdmin_1.cheakAdmin, student_controllers_1.deleteStudent);
router.post("/", cheakAdmin_1.cheakAdmin, student_controllers_1.createStudent);
exports.default = router;
