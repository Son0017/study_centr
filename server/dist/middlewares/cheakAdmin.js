"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheakAdmin = void 0;
const helperForSend_1 = require("../providers/helperForSend");
const cheakAdmin = (req, res, next) => {
    try {
        const admin = req.user.type;
        if (admin === "ADMIN") {
            next();
        }
        else {
            throw new Error(`Invalid admin`);
        }
    }
    catch (error) {
        (0, helperForSend_1.errorCreate)(res, error);
    }
};
exports.cheakAdmin = cheakAdmin;
