import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import reactRoutes from '../routes/react_jobs_route';
import angularRoutes from '../routes/angular_jobs_route';
import vueRoutes from '../routes/vue_jobs_route';
import userRoutes from '../routes/user_route';
import 'dotenv/config';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

const app = express();

app.use(express.json());
// app.use(loggerMiddleware)

// routers
app.use('/jobs/react', reactRoutes);
app.use('/jobs/angular', angularRoutes);
app.use('/jobs/vue', vueRoutes);
app.use('/users', userRoutes);

// greetings
app.get('/', (_, res: Response) => {
    res.send('Hello world');
});

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(
        `🚀 [API] ${req.method?.toUpperCase()} ${req.originalUrl}\n\nResponse ${
            res.statusCode
        } => ${res.json}`
    );
    next();
}

mongoose
    .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    .then(() => {
        console.log('connected to mongodb');

        app.listen(3001, () => {
            console.log('server is running on 3001');
        });
    })
    .catch(() => {
        console.log('connection failed');
    });
