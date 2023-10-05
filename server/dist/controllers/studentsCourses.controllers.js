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
exports.createStudentCourse = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const connectStudentWithCourse_1 = require("../providers/connectStudentWithCourse");
const createStudentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        const status = yield prisma_1.default.course.findFirst(body.courseId);
        if (!status) {
            throw new Error(`There is such a Course`);
        }
        if (!body.id) {
            (0, connectStudentWithCourse_1.notStudentConnection)(Object.assign(Object.assign({}, body), { course: status }));
        }
        else {
            (0, connectStudentWithCourse_1.studentConnection)({ id: body.id, course: status });
        }
        (0, helperForSend_1.createSend)(res, {
            message: "connection is successfull",
        });
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createStudentCourse = createStudentCourse;
