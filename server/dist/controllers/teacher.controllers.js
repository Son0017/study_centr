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
exports.login = exports.getAdmin = exports.getTeacher = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        body.summa = 0;
        const teacher = yield prisma_1.default.user.create({
            data: body,
        });
        (0, helperForSend_1.createSend)(res, teacher);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createTeacher = createTeacher;
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = req.user;
        if (!body.oldPassword) {
            const teacher = yield prisma_1.default.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    first_name: body.first_name,
                    last_name: body.last_name,
                    phone_number: body.phone_number,
                    payout_percentage: body.payout_percentage,
                },
            });
            return (0, helperForSend_1.updateSend)(res, teacher);
        }
        else {
            const teacher = yield prisma_1.default.user.findFirst({
                where: {
                    id: user.id,
                },
            });
            if ((teacher === null || teacher === void 0 ? void 0 : teacher.password) === body.oldPassword) {
                const teachers = yield prisma_1.default.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        first_name: body.first_name,
                        last_name: body.last_name,
                        phone_number: body.phone_number,
                        password: body.password,
                        payout_percentage: body.payout_percentage,
                    },
                });
                return (0, helperForSend_1.updateSend)(res, teachers);
            }
        }
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        if (user.type === "ADMIN") {
            const deletedTeacher = yield prisma_1.default.user.delete({
                where: { id: Number(id) },
            });
            return (0, helperForSend_1.deleteSend)(res, deletedTeacher.id);
        }
        else {
            throw new Error("Teacher is not admin");
        }
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteTeacher = deleteTeacher;
const getTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacher_id } = req.query;
        const { id, type } = req.user;
        let student;
        let query = {};
        if (teacher_id) {
            query = { id: Number(id) };
            student = yield prisma_1.default.user.findFirst({
                where: Object.assign({}, query),
                include: {
                    course: true,
                },
            });
        }
        else if (type === "ADMIN") {
            student = yield prisma_1.default.user.findMany({
                where: {
                    type: "TEACHER",
                },
            });
        }
        (0, helperForSend_1.getSend)(res, student);
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getTeacher = getTeacher;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let query = {};
        if (id) {
            query = { id: Number(id) };
        }
        const student = yield prisma_1.default.user.findMany({
            where: {
                type: "ADMIN",
            },
        });
        (0, helperForSend_1.getSend)(res, student);
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getAdmin = getAdmin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone_number, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                phone_number,
                password,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id, type: user === null || user === void 0 ? void 0 : user.type }, process.env.SECRET_KEY, { expiresIn: "30d" });
        res
            .cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 900000),
        })
            .send(Object.assign(Object.assign({}, user), { token }));
    }
    catch (error) {
        res.status(507).send({
            message: error.message,
        });
    }
});
exports.login = login;
