"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class RequestLimiter {
    constructor(frequency) {
        this.timeUnits = ['day', 'hour', 'minute'];
        this.timeFormat = {
            minute: 'DD HH:mm',
            hour: 'DD HH',
            day: 'DD',
        };
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
        this.limiter = (_, res, next) => {
            const currentTime = (0, moment_1.default)().add(8, 'h');
            let isLimited = false;
            this.timeUnits.map((val) => {
                const formattedTime = currentTime.format(`YYYY-MM-${this.timeFormat[val]}`);
                const currentCount = this.addCount(val, formattedTime);
                if (currentCount > this.frequencyMap[val]) {
                    isLimited = true;
                }
            });
            if (isLimited) {
                res.status(503).json({
                    error: 'Limited',
                });
                return;
            }
            next();
        };
        if (frequency) {
            this.setFrequency(frequency);
        }
    }
    addCount(unit, time) {
        var _a;
        let value = (_a = this.requestRecord[unit][time]) !== null && _a !== void 0 ? _a : 0;
        this.requestRecord[unit][time] = ++value;
        return value;
    }
    setFrequency(frequencyArr) {
        frequencyArr.map((val) => {
            const frequencyClip = val.split(' ');
            const frequency = parseInt(frequencyClip[0], 10);
            if (frequency > 0 && frequencyClip[1] === 'per' && this.timeUnits.includes(frequencyClip[2])) {
                this.frequencyMap[frequencyClip[2]] = frequency;
            }
        });
    }
}
exports.default = RequestLimiter;
