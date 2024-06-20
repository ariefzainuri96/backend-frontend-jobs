"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularJob = exports.VueJob = exports.ReactJob = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CompanySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter company name!'],
    },
    description: {
        type: String,
        required: [true, 'Please enter company description!'],
    },
    contactEmail: {
        type: String,
        required: [true, 'Please enter company contact email!'],
    },
    contactPhone: {
        type: String,
        required: [true, 'Please enter company contact phone!'],
    },
}, {
    timestamps: true,
});
const JobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Please enter job title!'],
    },
    type: {
        type: String,
        required: [true, 'Please enter job type!'],
    },
    description: {
        type: String,
        required: [true, 'Please enter job description!'],
    },
    location: {
        type: String,
        required: [true, 'Please enter job location!'],
    },
    salary: {
        type: String,
        required: [true, 'Please enter job salary!'],
    },
    company: {
        type: CompanySchema,
        required: [true, 'Please enter job company!'],
    },
}, {
    timestamps: true,
});
const reactDB = mongoose_1.default.connection.useDb('react');
const vueDB = mongoose_1.default.connection.useDb('vue');
const angularDB = mongoose_1.default.connection.useDb('angular');
const ReactJob = reactDB.model('Job', JobSchema);
exports.ReactJob = ReactJob;
const VueJob = vueDB.model('Job', JobSchema);
exports.VueJob = VueJob;
const AngularJob = angularDB.model('Job', JobSchema);
exports.AngularJob = AngularJob;
