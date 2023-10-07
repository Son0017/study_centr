"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentsCourses_controllers_1 = require("../controllers/studentsCourses.controllers");
const router = express_1.default.Router();
router.post("/", studentsCourses_controllers_1.createStudentCourse);
router.get("/:id", studentsCourses_controllers_1.getStudentCourse);
router.delete("/:id", studentsCourses_controllers_1.deleteStudentCourse);
exports.default = router;
