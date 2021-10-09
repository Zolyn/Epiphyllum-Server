import express from 'express';
import apicache from 'apicache';
import moment from 'moment';
import RequestLimiter from '../epiphyllum/middleware/limiter';

const app = express();

// @ts-ignore
const onlyCache200 = (req, res) => res.statusCode === 200;

const cache = apicache.options({
    headers: {
        'cache-control': 'no-cache',
    },
    debug: false,
}).middleware;

const limiter = new RequestLimiter(['3 per minute']).limiter;
app.use(limiter);
// app.use(cache('1 minute', onlyCache200));

app.get('/api', (req, res) => {
    const date = moment();
    console.log('Method executed.');
    res.send(moment().format('YYYY-MM-DD HH:mm'));
});

app.use((req, res) => {
    res.status(404).send('Error: 404 Not Found');
});

app.listen(3000, () => {
    console.log('Server started.');
});

module.exports = app;
