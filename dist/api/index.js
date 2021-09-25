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
const utils_1 = require("../epiphyllum/utils");
const epiphyllum_1 = require("../epiphyllum");
const app = (0, express_1.default)();
const cache = apicache_1.default.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: true,
}).middleware;
// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;
app.use(cache('1 minute', onlyCache200));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.ip) {
        res.redirect(`/?ip=${req.ip}`);
        return;
    }
    const [err, val] = yield (0, utils_1.awaitHelper)((0, epiphyllum_1.EpiphyllumEntry)());
    const responseObj = {
        status: 200,
    };
    if (!val) {
        utils_1.LiteLogger.err(err);
        responseObj.status = 500;
        res.status(500).json(responseObj);
        return;
    }
    responseObj.data = val;
    res.status(200).json(responseObj);
}));
app.listen(3000, () => {
    utils_1.LiteLogger.info('Listening on http://localhost:3000');
});
exports = app;
