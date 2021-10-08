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
const express_1 = __importDefault(require("express"));
const apicache_1 = __importDefault(require("apicache"));
const app = (0, express_1.default)();
// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;
const cache = apicache_1.default.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: false,
}).middleware;
app.use(cache('1 minute', onlyCache200));
app.get('/a', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('1');
    yield new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
    next();
}), (req, res) => {
    console.log('2');
    res.send('AAA');
});
app.use((req, res) => {
    res.status(404).send('Error: 404 Not Found');
});
app.listen(3000, () => {
    console.log('Server started.');
});
module.exports = app;
