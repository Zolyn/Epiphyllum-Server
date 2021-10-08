"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestLimiter {
    constructor(frequency) {
        this.timeUnits = ['minute', 'hour', 'day'];
        this.frequencyMap = {
            minute: 40,
            hour: 1500,
            day: 24000,
        };
        this.requestRecord = {
            minute: {},
            hour: {},
            day: {},
        };
        if (frequency) {
            this.setFrequency(frequency);
        }
    }
    limiter(req, res, next) { }
    setFrequency(frequencyArr) {
        frequencyArr.map((val) => {
            const frequencyClip = val.split(' ');
            const frequency = parseInt(frequencyClip[0], 10);
            if (frequency > 0 && frequencyClip[1] === 'per' && this.timeUnits.includes(frequencyClip[2])) {
                this.frequencyMap[frequencyClip[2]] = frequency;
            }
            return undefined;
        });
    }
}
function limiter(req, res, next) {
    timeUnits.map((val) => {
        var _a;
        const requestCount = (_a = requestRecord.get(val)) !== null && _a !== void 0 ? _a : 0;
        requestRecord.set(val, requestCount + 1);
        return undefined;
    });
    console.log('Request received.');
    timeUnits.reverse().map((val) => {
        console.log(val);
        const requestCount = requestRecord.get(val);
        if (requestCount >= 10) {
            res.status(400).json({
                code: 400,
            });
        }
        next();
        return undefined;
    });
}
