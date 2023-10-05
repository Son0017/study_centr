"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controllers_1 = require("../controllers/teacher.controllers");
const auth_1 = require("../auth/auth");
const router = express_1.default.Router();
router.get("/", auth_1.auth, teacher_controllers_1.getTeacher);
router.get("/admin", auth_1.auth, teacher_controllers_1.getAdmin);
router.patch("/:id", auth_1.auth, teacher_controllers_1.updateTeacher);
router.delete("/", auth_1.auth, teacher_controllers_1.deleteTeacher);
router.post("/", auth_1.auth, teacher_controllers_1.createTeacher);
router.post("/login", teacher_controllers_1.login);
exports.default = router;
