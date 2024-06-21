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
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(loggerMiddleware)
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
mongoose_1.default
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
