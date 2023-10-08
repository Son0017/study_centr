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
exports.getStudentAttendance = exports.deleteStudent = exports.createStudent = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        const Student = yield prisma_1.default.attendance.create({
            data: body,
        });
        (0, helperForSend_1.createSend)(res, Student);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createStudent = createStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = req.user;
        if (student.type === "ADMIN") {
            const deletedStudent = yield prisma_1.default.student.delete({
                where: { id: Number(id) },
            });
            return (0, helperForSend_1.deleteSend)(res, deletedStudent.id);
        }
        else {
            throw new Error("Student is not admin");
        }
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteStudent = deleteStudent;
const getStudentAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dates = new Date();
        let query = `${dates.getFullYear()}-${dates.getMonth()}-${dates.getDate()}`;
        const user = req.user;
        let uve = {};
        if (user.type === "TEACHER") {
            uve.course = {
                teacher_id: user.id,
            };
        }
        const data = prisma_1.default.attendance.findFirst({
            where: {
                AND: {
                    date: new Date(query),
                    course_id: Number(id),
                },
            },
        });
        const student = prisma_1.default.studentsCourses.findMany({
            where: {
                AND: Object.assign({ course_id: Number(id) }, uve),
            },
            include: {
                student: true,
            },
        });
        const [attendance, students] = yield prisma_1.default.$transaction([data, student]);
        (0, helperForSend_1.getSend)(res, {
            students,
            attendance: (attendance === null || attendance === void 0 ? void 0 : attendance.attendace) ? attendance === null || attendance === void 0 ? void 0 : attendance.attendace : [],
        });
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getStudentAttendance = getStudentAttendance;
