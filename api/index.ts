import express from 'express';
import apicache from 'apicache';
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
    debug: true,
}).middleware;

app.use(cache('1 minute'));

app.get('/', async (req, res) => {
    const [err, val] = await awaitHelper(EpiphyllumEntry());

    const responseObj: Response = {
        status: 200,
    };

    if (!val) {
        Logger.err(err);
        responseObj.status = 500;
        res.status(500).json(responseObj);
        return;
    }

    responseObj.data = val;

    res.status(200).json(responseObj);
});

app.listen(3000, () => {
    Logger.info('Listening on http://localhost:3000');
});

exports = app;
