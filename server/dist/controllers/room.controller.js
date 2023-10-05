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
exports.getRoom = exports.deleteRoom = exports.updateRoom = exports.createRoom = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
const helperForSend_1 = require("../providers/helperForSend");
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const Room = yield prisma_1.default.room.create({
            data: body,
        });
        (0, helperForSend_1.createSend)(res, Room);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.createRoom = createRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const RoomId = req.user.type === "Room"
            ? req.user.id
            : req.params.id;
        const Room = yield prisma_1.default.room.update({
            where: {
                id: RoomId,
            },
            data: Object.assign({}, body),
        });
        (0, helperForSend_1.updateSend)(res, Room);
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        if (user.type === "ADMIN") {
            const deletedRoom = yield prisma_1.default.room.delete({
                where: { id: Number(id) },
            });
            return (0, helperForSend_1.deleteSend)(res, deletedRoom.id);
        }
        else {
            throw new Error("Room is not admin");
        }
    }
    catch (error) {
        (0, helperForSend_1.errorDelete)(res, error);
    }
});
exports.deleteRoom = deleteRoom;
const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield prisma_1.default.room.findMany();
        (0, helperForSend_1.getSend)(res, room);
    }
    catch (error) {
        (0, helperForSend_1.errorGet)(res, error);
    }
});
exports.getRoom = getRoom;
