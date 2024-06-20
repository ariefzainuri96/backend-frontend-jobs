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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobById = exports.updateJobById = exports.getJobById = exports.getJobs = exports.addJob = void 0;
const helper_1 = require("../utils/helper");
const common_functions_1 = require("../common/common_functions");
const addJob = (model, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield model.validate(req.body);
        const job = yield model.create(body);
        if (job) {
            res.status(200).json({
                status: 200,
                message: 'Successfully create job',
                data: job,
            });
        }
        else {
            return (0, common_functions_1.sendError)(res, 400, 'Error creating job');
        }
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.addJob = addJob;
const getJobs = (model, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield model.find();
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch jobs',
            data: jobs,
        });
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.getJobs = getJobs;
const getJobById = (model, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield model.findById(id);
        if (!job) {
            return (0, common_functions_1.sendError)(res, 404, 'Job not found');
        }
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch Job',
            data: job,
        });
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.getJobById = getJobById;
const updateJobById = (model, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield model.findByIdAndUpdate(id, req.body);
        if (!job) {
            return (0, common_functions_1.sendError)(res, 404, 'Product not found!');
        }
        const updatedJob = yield model.findById(id);
        res.status(200).json({
            status: 200,
            message: 'Successfully update Product',
            data: updatedJob,
        });
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.updateJobById = updateJobById;
const deleteJobById = (model, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield model.findByIdAndDelete(id);
        if (!product) {
            return (0, common_functions_1.sendError)(res, 404, 'Product not found');
        }
        res.status(200).json({
            status: 200,
            message: 'Successfully delete Product',
            data: product,
        });
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.deleteJobById = deleteJobById;
