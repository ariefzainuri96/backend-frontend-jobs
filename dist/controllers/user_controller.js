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
exports.current = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const helper_1 = require("../utils/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_functions_1 = require("../common/common_functions");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = new user_model_1.default(req.body);
        yield data.validate();
        const userNotAvailable = yield user_model_1.default.findOne({
            email: data.email,
        });
        if (userNotAvailable) {
            return (0, common_functions_1.sendError)(res, 400, 'Email already used!');
        }
        const hashedPassword = yield bcrypt_1.default.hash((_a = data.password) !== null && _a !== void 0 ? _a : '', 10);
        data.password = hashedPassword;
        const user = yield data.save();
        if (user) {
            res.status(200).json({
                message: 'Register Success',
                status: 200,
                data: user,
            });
        }
        else {
            (0, common_functions_1.sendError)(res, 400, 'User data is not valid');
        }
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new user_model_1.default(req.body);
        yield data.validate();
        const user = yield user_model_1.default.findOne({
            email: data.email,
        });
        // compare password with hash password
        if (user && (yield bcrypt_1.default.compare(data.password, user.password))) {
            const token = jsonwebtoken_1.default.sign({
                email: user.email,
                id: user.id,
            }, `${process.env.ACCESS_TOKEN_SECRET}`, {
                expiresIn: '365d',
            });
            res.status(200).json({
                status: 200,
                message: 'Login Success',
                data: token,
            });
        }
        else {
            (0, common_functions_1.sendError)(res, 401, 'Email or Password is not valid');
        }
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
});
exports.login = login;
const current = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 200,
            message: 'Get Current Profile Success',
            data: req.user,
        });
    }
    catch (error) {
        (0, common_functions_1.sendError)(res, 500, (0, helper_1.handleError)(error));
    }
});
exports.current = current;
