"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorDelete = exports.deleteSend = exports.errorGet = exports.getSend = exports.errorUpdate = exports.updateSend = exports.errorCreate = exports.createSend = void 0;
const createSend = (res, data) => {
    return res.status(201).send({
        data,
        succes: true,
    });
};
exports.createSend = createSend;
const errorCreate = (res, data) => {
    console.log(data);
    return res.status(501).send({
        data: null,
        messages: data.message,
        succes: false,
    });
};
exports.errorCreate = errorCreate;
const updateSend = (res, data) => {
    return res.status(202).send({
        data,
        succes: true,
    });
};
exports.updateSend = updateSend;
const errorUpdate = (res, data) => {
    console.log(data.message);
    return res.status(502).send({
        data: null,
        messages: data.message,
        succes: false,
    });
};
exports.errorUpdate = errorUpdate;
const getSend = (res, data) => {
    return res.status(200).send({
        data,
        succes: true,
    });
};
exports.getSend = getSend;
const errorGet = (res, data) => {
    return res.status(500).send({
        data: null,
        messages: data.message,
        succes: false,
    });
};
exports.errorGet = errorGet;
const deleteSend = (res, data) => {
    return res.status(203).send({
        data,
        succes: true,
    });
};
exports.deleteSend = deleteSend;
const errorDelete = (res, data) => {
    return res.status(503).send({
        data: null,
        messages: data.message,
        succes: false,
    });
};
exports.errorDelete = errorDelete;
