"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user_controller");
const validate_token_1 = require("../middleware/validate_token");
const router = express_1.default.Router();
router.post('/register', (req, res) => {
    /*
    #swagger.summary = 'Register account';
    #swagger.description = 'testing description';
    #swagger.parameters['body'] = {
        required: true,
        in: 'body',
        schema: { $ref: '#/components/schemas/LoginRequest' },
    };
    */
    return (0, user_controller_1.register)(req, res);
});
router.post('/login', (req, res) => {
    /*
    #swagger.summary = 'Login to get an access token';
    #swagger.description = 'testing description';
    #swagger.parameters['body'] = {
        required: true,
        in: 'body',
        schema: { $ref: '#/components/schemas/LoginRequest' },
    };
    */
    return (0, user_controller_1.login)(req, res);
});
router.get('/current', validate_token_1.validateToken, user_controller_1.current);
exports.default = router;
