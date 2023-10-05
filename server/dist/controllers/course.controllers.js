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
exports.getCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const courseProvide_1 = require("../providers/courseProvide");
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        body = (0, courseProvide_1.statusChaker)(body);
        const course = yield prisma_1.default.course.create({
            data: body,
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
        const course = yield prisma_1.default.course.findFirst({
            where: { id },
        });
        if (body.status && !(course === null || course === void 0 ? void 0 : course.status)) {
            let started_data = body.started_data
                ? body.started_data
                : course === null || course === void 0 ? void 0 : course.started_data;
            let price = body.price ? body.price : course === null || course === void 0 ? void 0 : course.price;
            if (started_data && price && price > 0) {
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
                        students: {
                            where: {
                                debt_summa: {
                                    gt: 1000,
                                },
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
