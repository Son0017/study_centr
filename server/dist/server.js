"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const studentDebt_routes_1 = __importDefault(require("./routes/studentDebt.routes"));
const studentsCourses_routes_1 = __importDefault(require("./routes/studentsCourses.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const auth_1 = require("./auth/auth");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/course", auth_1.auth, course_routes_1.default);
app.use("/student", auth_1.auth, student_routes_1.default);
app.use("/teacher", teacher_routes_1.default);
app.use("/studentDebt", auth_1.auth, studentDebt_routes_1.default);
app.use("/studentsCourses", auth_1.auth, studentsCourses_routes_1.default);
app.use("/room", auth_1.auth, room_routes_1.default);
const PORT = process.env.Port || 8080;
app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
