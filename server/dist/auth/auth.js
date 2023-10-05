"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("token is required");
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(505).send(error.message);
    }
};
exports.auth = auth;
