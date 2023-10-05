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
exports.notStudentConnection = exports.studentConnection = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const finfOutDay_1 = require("../utils/finfOutDay");
// qoralama qurs uchun qilingan kunliklar hisoblanilmagan
const studentConnection = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let debt_summa = 0;
    let newDate = null;
    if (body.course.status) {
        newDate = new Date();
        let findDays = (0, finfOutDay_1.findDay)(newDate);
        debt_summa = Math.ceil((body.course.price / 30000) * findDays) * -1000;
    }
    const studentCourse = yield prisma_1.default.studentsCourses.create({
        data: {
            student_id: body.id,
            course_id: body.course.id,
            debt_summa,
            student_acsept_date: newDate,
        },
    });
    return studentCourse;
});
exports.studentConnection = studentConnection;
const notStudentConnection = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const student_id = yield prisma_1.default.student.create({
        data: {
            first_name: body.first_name,
            last_name: body.last_name,
            phone_number: body.phone_number,
            visited_date: body.visited_date,
            status: body.course.status ? true : false,
        },
        select: {
            id: true,
        },
    });
    const studentCourse = yield (0, exports.studentConnection)(Object.assign(Object.assign({}, body), { id: student_id.id }));
    return studentCourse;
});
exports.notStudentConnection = notStudentConnection;
