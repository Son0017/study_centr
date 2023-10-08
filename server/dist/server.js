"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myF = void 0;
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
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const auth_1 = require("./auth/auth");
const prisma_1 = __importDefault(require("./connection/prisma"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/course", auth_1.auth, course_routes_1.default);
app.use("/attendance", auth_1.auth, attendance_routes_1.default);
app.use("/student", auth_1.auth, student_routes_1.default);
app.use("/teacher", teacher_routes_1.default);
app.use("/studentDebt", auth_1.auth, studentDebt_routes_1.default);
app.use("/studentsCourses", auth_1.auth, studentsCourses_routes_1.default);
app.use("/room", auth_1.auth, room_routes_1.default);
const PORT = process.env.Port || 8080;
const myF = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const debt = yield prisma_1.default.studentsCourses.findMany({
            include: { course: true },
        });
        debt.map((student) => __awaiter(void 0, void 0, void 0, function* () {
            if (student.course.status) {
                let debt_summa = 0;
                let teacher = 0;
                let course_id = student.course_id;
                let student_id = student.student_id;
                let lastMon = new Date(student.student_acsept_date).getMonth();
                if (lastMon !== new Date().getMonth()) {
                    debt_summa = student.course.price;
                    teacher = student.course.price * 0.5;
                }
                else {
                    debt_summa = student.debt_summa;
                }
                const data = yield prisma_1.default.studentDebt.findFirst({
                    where: {
                        AND: {
                            student_id,
                            course_id,
                        },
                    },
                });
                if (data) {
                    let last = data && new Date(data === null || data === void 0 ? void 0 : data.createdAt).getMonth();
                    if (last !== new Date().getMonth()) {
                        yield prisma_1.default.studentDebt.create({
                            data: {
                                debt_summa: true,
                                summa: debt_summa,
                                course_id,
                                student_id,
                                teacher_payout: teacher,
                            },
                        });
                    }
                }
                else {
                    yield prisma_1.default.studentDebt.create({
                        data: {
                            debt_summa: true,
                            summa: debt_summa,
                            course_id,
                            student_id,
                            teacher_payout: teacher,
                        },
                    });
                }
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.myF = myF;
app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
