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
const express_1 = __importDefault(require("express"));
const jobs_controller_1 = require("../controllers/jobs_controller");
const job_model_1 = require("../models/job_model");
const validate_token_1 = require("../middleware/validate_token");
const router = express_1.default.Router();
// validate token for all request in this routes
router.use(validate_token_1.validateToken);
// add job
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    #swagger.summary = 'Post Job';
    #swagger.description = 'Post job related to react framework';
    #swagger.parameters['body'] = {
        required: true,
        in: 'body',
        schema: { $ref: '#/components/schemas/ReactJobRequest' },
    };
    */
    return yield (0, jobs_controller_1.addJob)(job_model_1.ReactJob, req, res);
}));
// get all jobs
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, jobs_controller_1.getJobs)(job_model_1.ReactJob, req, res); }));
// get job by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, jobs_controller_1.getJobById)(job_model_1.ReactJob, req, res); }));
// update job by id
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, jobs_controller_1.updateJobById)(job_model_1.ReactJob, req, res); }));
// delete job by id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, jobs_controller_1.deleteJobById)(job_model_1.ReactJob, req, res); }));
exports.default = router;
