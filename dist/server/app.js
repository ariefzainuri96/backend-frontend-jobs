"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const react_jobs_route_1 = __importDefault(require("../routes/react_jobs_route"));
const angular_jobs_route_1 = __importDefault(require("../routes/angular_jobs_route"));
const vue_jobs_route_1 = __importDefault(require("../routes/vue_jobs_route"));
const user_route_1 = __importDefault(require("../routes/user_route"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
require("dotenv/config");
const corsOptions = {
    origin: 'https://ariefzainuri96.github.io',
    methods: 'GET,POST,OPTIONS,DELETE,PUT',
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
};
const path = require('path');
const cors = require('cors');
const app = (0, express_1.default)();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger/swagger-output.json');
app.use(cors(corsOptions));
app.use(express_1.default.json());
// app.use(loggerMiddleware)
// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// routers
app.use('/react/jobs', react_jobs_route_1.default);
app.use('/angular/jobs', angular_jobs_route_1.default);
app.use('/vue/jobs', vue_jobs_route_1.default);
app.use('/users', user_route_1.default);
// greetings
app.get('/', (_, res) => {
    res.send('You are connected to Frontend Jobs API');
});
function loggerMiddleware(req, res, next) {
    var _a;
    console.log(`🚀 [API] ${(_a = req.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${req.originalUrl}\n\nResponse ${res.statusCode} => ${res.json}`);
    next();
}
const options = {
    key: fs_1.default.readFileSync(path.resolve(__dirname, '../crt/private_key.key')),
    cert: fs_1.default.readFileSync(path.resolve(__dirname, '../crt/sectigo_zain-api.xyz_crt.crt')),
    ca: [
        fs_1.default.readFileSync(path.resolve(__dirname, '../crt/sectigo_zain-api.xyz_intermediate.crt')),
        fs_1.default.readFileSync(path.resolve(__dirname, '../crt/sectigo_zain-api.xyz_root.crt')),
    ],
};
mongoose_1.default
    .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    .then(() => {
    console.log('connected to mongodb');
    const port = 3001;
    if (process.env.ENV === 'production') {
        https_1.default.createServer(options, app).listen(port, () => {
            console.log(`Server is running on https://zain-api.xyz:${port}`);
        });
    }
    else {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
})
    .catch(() => {
    console.log('connection failed');
});
