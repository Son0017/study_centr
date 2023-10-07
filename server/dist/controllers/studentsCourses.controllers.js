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
exports.deleteStudentCourse = exports.getStudentCourse = exports.createStudentCourse = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const connectStudentWithCourse_1 = require("../providers/connectStudentWithCourse");
const createStudentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        const status = yield prisma_1.default.course.findFirst({
            where: {
                id: body.courseId,
            },
        });
        let response;
        if (!body.id) {
            response = yield (0, connectStudentWithCourse_1.notStudentConnection)(Object.assign(Object.assign({}, body), { course: status }));
        }
        else {
            response = yield (0, connectStudentWithCourse_1.studentConnection)({
                id: body.id,
                course: status,
            });
        }
        (0, helperForSend_1.createSend)(res, response === null || response === void 0 ? void 0 : response.student);
    }
    catch (error) {
        // console.log(error);
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createStudentCourse = createStudentCourse;
const getStudentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const data = yield prisma_1.default.studentsCourses.findMany({
            where: {
                course_id: Number(id),
            },
            include: {
                student: true,
            },
        });
        (0, helperForSend_1.getSend)(res, data);
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getStudentCourse = getStudentCourse;
const deleteStudentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let student_id = id.split(",")[0];
        let course_id = id.split(",")[1];
        const data = yield prisma_1.default.studentsCourses.delete({
            where: {
                student_id_course_id: {
                    student_id: Number(student_id),
                    course_id: Number(course_id),
                },
            },
        });
        (0, helperForSend_1.deleteSend)(res, data);
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteStudentCourse = deleteStudentCourse;
