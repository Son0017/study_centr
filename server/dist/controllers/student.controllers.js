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
exports.getStudent = exports.deleteStudent = exports.updateStudent = exports.createStudent = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body.last_name);
        const Student = yield prisma_1.default.student.create({
            data: {
                last_name: body.last_name,
                first_name: body.first_name,
                phone_number: body.phone_number,
                status: body.status,
                visited_date: body.visited_date,
            },
        });
        (0, helperForSend_1.createSend)(res, Student);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        let data = {};
        Object.keys(body).forEach((key) => {
            data[key] = body[key];
        });
        const Student = yield prisma_1.default.student.update({
            where: {
                id: Number(id),
            },
            data: Object.assign({}, data),
        });
        (0, helperForSend_1.updateSend)(res, Student);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedStudent = yield prisma_1.default.student.delete({
            where: { id: Number(id) },
        });
        return (0, helperForSend_1.deleteSend)(res, deletedStudent.id);
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteStudent = deleteStudent;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { search, course_id } = req.query;
        let student;
        let query = {};
        if (id) {
            query.id = Number(id);
            const students = yield prisma_1.default.student.findFirst({
                where: Object.assign({}, query),
                include: {
                    course: {
                        include: {
                            course: true,
                        },
                    },
                },
            });
            student = students;
        }
        else {
            if (course_id) {
                query.course = {
                    every: {
                        course_id: {
                            not: Number(course_id),
                        },
                    },
                };
            }
            if (search) {
                if (Number(search)) {
                    query.id = Number(search);
                }
                else {
                    query.last_name = {
                        startsWith: search ? search.trim() : "",
                    };
                }
            }
            const students = yield prisma_1.default.student.findMany({
                where: {
                    AND: Object.assign({}, query),
                },
                skip: 0,
                take: 10,
            });
            student = students;
        }
        (0, helperForSend_1.getSend)(res, student);
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getStudent = getStudent;
