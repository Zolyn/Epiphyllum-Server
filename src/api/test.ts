import express from 'express';
import apicache from 'apicache';
import * as moment from 'moment';

const app = express();

// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;

const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: false,
}).middleware;

app.use(cache('1 minute', onlyCache200));

app.get(
    '/a',
    async (req, res, next) => {
        console.log('1');
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
        next();
    },
    (req, res) => {
        console.log('2');
        res.send('AAA');
    },
);

app.use((req, res) => {
    res.status(404).send('Error: 404 Not Found');
});

app.listen(3000, () => {
    console.log('Server started.');
});

module.exports = app;
