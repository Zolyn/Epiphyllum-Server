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
const app = (0, express_1.default)();
const cache = apicache_1.default.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: false,
}).middleware;
// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;
// app.use(cache('1 minute', onlyCache200));
let requests = 0;
app.get('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    requests++;
    console.log(req.query.id);
    if (requests > 20) {
        requests--;
        res.status(200).json({
            msg: `[${req.query.id}]Limited.`,
        });
    }
    else {
        yield new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
        requests--;
        res.status(200).json({
            msg: `[${req.query.id}]Completed.`,
        });
    }
    // const responseData: Response = {
    //     status: 200,
    // };
    //
    // if (requests === 10) {
    //     responseData.status = 502;
    //     res.status(502).json(responseData);
    //     return;
    // }
    //
    // if (!req.query.ip) {
    //     responseData.status = 403;
    //     res.status(403).json(responseData);
    //     return;
    // }
    //
    // requests += 1;
    // const [err, val] = await awaitHelper(
    //     new Promise<void>((resolve) => {
    //         setTimeout(() => resolve(), 2000);
    //     }),
    // );
    //
    // requests -= 1;
    // if (!val) {
    //     Logger.err(err);
    //     responseData.status = 500;
    //     res.status(500).json(responseData);
    //     return;
    // }
    //
    // responseData.data = val;
    // res.status(200).json(responseData);
}));
app.listen(3000, () => {
    utils_1.LiteLogger.info('Listening on http://localhost:3000');
});
module.exports = app;
