import express from 'express';
import apicache from 'apicache';
import { awaitHelper, LiteLogger as Logger } from '../epiphyllum/utils';
import { EpiphyllumEntry, EpiphyllumEntryReturn } from '../epiphyllum';
import RequestLimiter from '../epiphyllum/middleware/limiter';

interface Response {
    status: number;
    msg: string;
    data?: EpiphyllumEntryReturn;
}

const app = express();
const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: false,
}).middleware;

const limiter = new RequestLimiter().limiter;

app.use(limiter);

// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;

app.use(cache('1 minute', onlyCache200));

app.get('/api', async (req, res) => {
    const responseData: Response = {
        status: 200,
        msg: 'Done.',
    };

    if (!req.query.ip) {
        responseData.status = 403;
        responseData.msg = 'Missing parameter.';
        res.status(403).json(responseData);
        return;
    }

    const [err, val] = await awaitHelper(EpiphyllumEntry());

    if (!val) {
        Logger.err(err);
        responseData.status = 500;
        responseData.msg = 'Internal error.';
        res.status(500).json(responseData);
        return;
    }

    responseData.data = val;
    res.status(200).json(responseData);
});

app.listen(3000, () => {
    Logger.info('Listening on http://localhost:3000');
});

module.exports = app;
