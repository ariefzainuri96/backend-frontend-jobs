import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import reactRoutes from '../routes/react_jobs_route';
import angularRoutes from '../routes/angular_jobs_route';
import vueRoutes from '../routes/vue_jobs_route';
import userRoutes from '../routes/user_route';
import fs from 'fs';
import https from 'https';

import 'dotenv/config';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

const corsOptions = {
    origin: 'https://ariefzainuri96.github.io', // Your React app URL
    methods: 'GET,POST,OPTIONS,DELETE,PUT', // Allow these methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
};

const path = require('path');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger/swagger-output.json');

app.use(cors(corsOptions));
app.use(express.json());
// app.use(loggerMiddleware)

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// routers
app.use('/react/jobs', reactRoutes);
app.use('/angular/jobs', angularRoutes);
app.use('/vue/jobs', vueRoutes);
app.use('/users', userRoutes);

// greetings
app.get('/', (_, res: Response) => {
    res.send('You are connected to Frontend Jobs API!!!!');
});

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(
        `🚀 [API] ${req.method?.toUpperCase()} ${req.originalUrl}\n\nResponse ${
            res.statusCode
        } => ${res.json}`
    );
    next();
}

const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../crt/private_key.key')),
    cert: fs.readFileSync(
        path.resolve(__dirname, '../crt/sectigo_zain-api.xyz_crt.crt')
    ),
    ca: [
        fs.readFileSync(
            path.resolve(
                __dirname,
                '../crt/sectigo_zain-api.xyz_intermediate.crt'
            )
        ),
        fs.readFileSync(
            path.resolve(__dirname, '../crt/sectigo_zain-api.xyz_root.crt')
        ),
    ],
};

mongoose
    .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    .then(() => {
        console.log('connected to mongodb');

        const port = 3001;

        if (process.env.ENV === 'production') {
            https.createServer(options, app).listen(port, () => {
                console.log(
                    `Server is running on https://zain-api.xyz:${port}`
                );
            });
        } else {
            app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
        }
    })
    .catch(() => {
        console.log('connection failed');
    });
