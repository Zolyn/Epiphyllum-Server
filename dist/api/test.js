"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apicache_1 = __importDefault(require("apicache"));
const moment_1 = __importDefault(require("moment"));
const limiter_1 = __importDefault(require("../epiphyllum/middleware/limiter"));
const app = (0, express_1.default)();
// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;
const cache = apicache_1.default.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: false,
}).middleware;
const limiter = new limiter_1.default(['3 per minute']).limiter;
app.use(limiter);
// app.use(cache('1 minute', onlyCache200));
app.get('/api', (req, res) => {
    const date = (0, moment_1.default)();
    console.log('Method executed.');
    res.send((0, moment_1.default)().format('YYYY-MM-DD HH:mm'));
});
app.use((req, res) => {
    res.status(404).send('Error: 404 Not Found');
});
app.listen(3000, () => {
    console.log('Server started.');
});
module.exports = app;
