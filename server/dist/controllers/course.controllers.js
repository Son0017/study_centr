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
exports.getCourses = exports.getCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const courseProvide_1 = require("../providers/courseProvide");
const server_1 = require("../server");
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        body = (0, courseProvide_1.statusChaker)(body);
        const course = yield prisma_1.default.course.create({
            data: Object.assign(Object.assign({}, body), { price: Number(body.price) }),
            include: {
                teacher: true,
                _count: {
                    select: {
                        students: true,
                    },
                },
            },
        });
        return (0, helperForSend_1.createSend)(res, course);
    }
    catch (error) {
        console.log(error);
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        const id = Number(req.params.id);
        let query = {};
        console.log(body);
        if (body.status) {
            let started_data = body.started_data;
            let price = Number(body.price);
            console.log(33);
            if (started_data && price && price > 0) {
                console.log(22);
                yield (0, courseProvide_1.startCourses)(Object.assign(Object.assign({}, body), { id: id }));
                return res.status(201).send({
                    message: "Course updated successfully",
                });
            }
            else {
                throw new Error(`You must provide price and started_data`);
            }
        }
        else {
            Object.keys(body).map((key) => {
                if (key !== "started_data") {
                    query[key] = body[key];
                }
            });
        }
        const courseel = yield prisma_1.default.course.update({
            where: { id },
            data: Object.assign({}, query),
            include: {
                teacher: true,
            },
        });
        return (0, helperForSend_1.updateSend)(res, courseel);
    }
    catch (error) {
        (0, helperForSend_1.errorUpdate)(res, error);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTeacher = yield prisma_1.default.user.delete({
            where: { id: Number(id) },
        });
        return (0, helperForSend_1.deleteSend)(res, deletedTeacher.id);
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteCourse = deleteCourse;
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield prisma_1.default.course.findMany({
            include: {
                _count: {
                    select: {
                        studentDebt: {
                            where: {
                                debt_summa: true,
                            },
                        },
                    },
                },
            },
        });
        return (0, helperForSend_1.getSend)(res, course);
    }
    catch (error) {
        return (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getCourse = getCourse;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, students } = req.query;
        let query = {};
        const user = req.user;
        if (status === "group") {
            query.status = true;
        }
        else if (status === "black") {
            query.status = false;
        }
        let include = {};
        if (user.type === "TEACHER") {
            query.teacher_id = user.id;
        }
        if (students) {
            include.students = students;
        }
        (0, server_1.myF)();
        const course = yield prisma_1.default.course.findMany({
            where: {
                AND: Object.assign({}, query),
            },
            include: {
                teacher: true,
                room: true,
                _count: {
                    select: {
                        students: true,
                    },
                },
            },
        });
        return (0, helperForSend_1.getSend)(res, course);
    }
    catch (error) {
        return (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getCourses = getCourses;
