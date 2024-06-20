"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isText = exports.sendError = void 0;
const helper_1 = require("../utils/helper");
function sendError(res, status, err) {
    res.status(status).json({
        status: status,
        message: (0, helper_1.handleError)(err)
    });
}
exports.sendError = sendError;
function isText(data) {
    return typeof data === 'string';
}
exports.isText = isText;
;
