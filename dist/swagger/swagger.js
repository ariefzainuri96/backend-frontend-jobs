"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const swagger_schema_1 = __importDefault(require("./swagger-schema"));
require("dotenv/config");
const doc = {
    info: {
        title: 'My Express API',
        description: 'API documentation generated with swagger-autogen',
    },
    host: `${process.env.NODE_ENV === 'production' ? '205.198.87.68' : 'localhost'}:3001`,
    schemes: ['http'],
    components: {
        // OpenAPI 3.0
        // securitySchemes: {
        //     bearerAuth: {
        //         type: 'http',
        //         scheme: 'bearer',
        //         bearerFormat: 'JWT', // or 'Token'
        //     },
        // },
        schemas: {
            LoginRequest: swagger_schema_1.default,
        },
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter your JWT token like: Bearer <token>',
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['../server/app.ts']; // Main file containing routes
(0, swagger_autogen_1.default)(outputFile, endpointsFiles, doc);
