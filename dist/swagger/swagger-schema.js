"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactSwaggerSchema = exports.userSwaggerSchema = void 0;
const job_model_1 = require("../models/job_model");
const user_model_1 = __importDefault(require("../models/user_model"));
const mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
const userSwaggerSchema = (0, mongoose_to_swagger_1.default)(user_model_1.default, {
    omitFields: ['_id', 'createdAt', 'updatedAt'],
});
exports.userSwaggerSchema = userSwaggerSchema;
const reactSwaggerSchema = (0, mongoose_to_swagger_1.default)(job_model_1.ReactJob, {
    omitFields: ['_id', 'createdAt', 'updatedAt'],
});
exports.reactSwaggerSchema = reactSwaggerSchema;
