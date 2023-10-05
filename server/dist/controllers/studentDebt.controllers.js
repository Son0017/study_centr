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
exports.getStudentDebt = exports.deleteStudentDebt = exports.updateStudentDebt = exports.createStudentDebt = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const createStudentDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        body.teacher_payout = 0.5;
        const studentDebt = yield prisma_1.default.studentDebt.create({
            data: body,
        });
        (0, helperForSend_1.createSend)(res, studentDebt);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createStudentDebt = createStudentDebt;
const updateStudentDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const id = req.params.id;
        const studentDebt = yield prisma_1.default.studentDebt.update({
            where: {
                id: Number(id),
            },
            data: Object.assign({}, body),
        });
        (0, helperForSend_1.updateSend)(res, studentDebt);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.updateStudentDebt = updateStudentDebt;
const deleteStudentDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        if (user.type === "ADMIN") {
            const deletedstudentDebt = yield prisma_1.default.studentDebt.delete({
                where: { id: Number(id) },
            });
            return (0, helperForSend_1.deleteSend)(res, deletedstudentDebt.id);
        }
        else {
            throw new Error("studentDebt is not admin");
        }
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteStudentDebt = deleteStudentDebt;
const getStudentDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { limit, offset } = req.query;
        const { id } = req.params;
        let take = limit ? Number(limit) : 10;
        let skip = offset ? Number(offset) : 0;
        let query = {};
        if (id) {
            query.student_id = Number(id);
        }
        console.log(query);
        const data = yield prisma_1.default.studentDebt.findMany({
            where: {
                AND: Object.assign({ debt_summa: true }, query),
            },
            take: take,
            skip: skip,
            include: {
                student: true,
                course: true,
            },
        });
        return (0, helperForSend_1.getSend)(res, data);
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getStudentDebt = getStudentDebt;
