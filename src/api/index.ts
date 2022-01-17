import express from 'express';
import apicache from 'apicache';
import { awaitHelper } from '../epiphyllum/utils';
import { EpiphyllumEntry, EpiphyllumEntryReturn } from '../epiphyllum';

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

// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;

app.use(cache('2 minutes', onlyCache200));

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
        console.error(err);
        responseData.status = 500;
        responseData.msg = 'Internal error.';
        res.status(500).json(responseData);
        return;
    }

    responseData.data = val;
    res.status(200).json(req.headers['x-real-ip']);
});

app.listen(3000, () => {
    console.info('Listening on http://localhost:3000');
});

module.exports = app;
