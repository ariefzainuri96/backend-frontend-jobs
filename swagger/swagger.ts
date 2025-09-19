import swaggerAutogen from 'swagger-autogen';
import userSwaggerSchema from './swagger-schema';

const doc = {
    info: {
        title: 'My Express API',
        description: 'API documentation generated with swagger-autogen',
    },
    host: 'localhost:3001', // Update for production later
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
            LoginRequest: userSwaggerSchema,
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
