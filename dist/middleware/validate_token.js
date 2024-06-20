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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_functions_1 = require("../common/common_functions");
// import { ICustomRequest } from "../interfaces/i_custom_request";
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(`${req.baseUrl} ${authHeader}`);
    if (authHeader && ((0, common_functions_1.isText)(authHeader) && authHeader.startsWith('Bearer'))) {
        token = authHeader.split(' ')[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;
        console.log(`token => ${token}`);
        console.log(`JWT_SECRET => ${secret}`);
        jsonwebtoken_1.default.verify(token, `${secret}`, (err, decoded) => {
            if (err) {
                return (0, common_functions_1.sendError)(res, 401, 'User is not authorized');
            }
            req.user = decoded;
            console.log(decoded);
            next();
        });
    }
    if (!token) {
        (0, common_functions_1.sendError)(res, 401, 'User is not authorized or token is missing');
    }
});
exports.validateToken = validateToken;
