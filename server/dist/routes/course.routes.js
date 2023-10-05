"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controllers_1 = require("../controllers/course.controllers");
const cheakAdmin_1 = require("../middlewares/cheakAdmin");
const router = express_1.default.Router();
router.get("/", course_controllers_1.getCourse);
router.patch("/:id", cheakAdmin_1.cheakAdmin, course_controllers_1.updateCourse);
router.post("/", cheakAdmin_1.cheakAdmin, course_controllers_1.createCourse);
router.delete("/", cheakAdmin_1.cheakAdmin, course_controllers_1.deleteCourse);
exports.default = router;
