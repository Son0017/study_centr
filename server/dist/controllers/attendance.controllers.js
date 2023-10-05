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
exports.getStudent = exports.deleteStudent = exports.createStudent = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
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
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getStudent = getStudent;
