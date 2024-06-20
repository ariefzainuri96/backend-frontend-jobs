"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStatus = exports.handleError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function handleError(error) {
    if (error instanceof Error)
        return error.message;
    return `${error}`;
}
exports.handleError = handleError;
function handleStatus(error) {
    return error instanceof mongoose_1.default.Error.ValidationError ? 400 : 500;
}
exports.handleStatus = handleStatus;
