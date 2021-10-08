import express from 'express';
import apicache from 'apicache';
import moment from 'moment';
import { awaitHelper, LiteLogger as Logger } from '../epiphyllum/utils';
import { EpiphyllumEntry, EpiphyllumEntryReturn } from '../epiphyllum';

interface Response {
    status: number;
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

app.use(cache('1 minute', onlyCache200));

app.get('/api', async (req, res) => {
    res.json({
        date: moment().format(),
    });
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
});

app.listen(3000, () => {
    Logger.info('Listening on http://localhost:3000');
});

module.exports = app;
