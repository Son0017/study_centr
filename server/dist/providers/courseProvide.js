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
exports.startCourses = exports.statusChaker = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const finfOutDay_1 = require("../utils/finfOutDay");
const statusChaker = (body) => {
    let result = Object.assign({}, body);
    if (body.status) {
        if (!body.price && body.price > 0) {
            throw new Error("you must provide a price");
        }
        if (!body.started_data) {
            throw new Error("you must provide a started data");
        }
    }
    else {
        result.status = false;
        result.started_data = body.started_data || null;
        result.price = body.price || 0;
    }
    return result;
};
exports.statusChaker = statusChaker;
const startCourses = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let started_data = new Date(body.started_data);
    let findDays = (0, finfOutDay_1.findDay)(started_data);
    const students = yield prisma_1.default.studentsCourses.findMany({
        where: {
            course_id: body.id,
        },
    });
    let newPrice = Math.ceil((body.price / 30000) * findDays) * 1000;
    const datas = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            for (let i = 0; i < students.length; i++) {
                yield prisma.studentsCourses.update({
                    where: {
                        student_id_course_id: {
                            student_id: students[i].student_id,
                            course_id: students[i].course_id,
                        },
                    },
                    data: {
                        student_acsept_date: started_data,
                        debt_summa: newPrice,
                    },
                });
            }
            yield prisma.course.update({
                where: {
                    id: body.id,
                },
                data: {
                    status: body.status,
                    started_data: started_data,
                    price: body.price,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }));
    return datas;
});
exports.startCourses = startCourses;
