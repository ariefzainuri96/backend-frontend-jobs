import swaggerAutogen from 'swagger-autogen';
import { reactSwaggerSchema, userSwaggerSchema } from './swagger-schema';
import 'dotenv/config';

const doc = {
    info: {
        title: 'My Express API',
        description: 'API documentation generated with swagger-autogen',
    },
    host: `${
        process.env.ENV === 'production' ? 'zain-api.xyz' : 'localhost'
    }:3001`, // Update for production later
    schemes: process.env.ENV === 'production' ? ['https'] : ['http'],
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
            LoginRequest: userSwaggerSchema,
            ReactJobRequest: reactSwaggerSchema,
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

swaggerAutogen(outputFile, endpointsFiles, doc);
