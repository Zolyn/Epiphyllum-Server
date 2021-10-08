import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';

interface FrequencyMap {
    minute: number;
    hour: number;
    day: number;
}

type TimeUnits = keyof FrequencyMap;

interface RequestTimeRecord {
    [time: string]: number;
}

type RequestRecord = Record<TimeUnits, RequestTimeRecord>;

class RequestLimiter {
    private readonly timeUnits: TimeUnits[] = ['minute', 'hour', 'day'];
    private frequencyMap: FrequencyMap = {
        minute: 40,
        hour: 1500,
        day: 24000,
    };

    private requestRecord: RequestRecord = {
        minute: {},
        hour: {},
        day: {},
    };

    public constructor(frequency?: string[]) {
        if (frequency) {
            this.setFrequency(frequency);
        }
    }

    public limiter(req: Request, res: Response, next: NextFunction): void {}

    private setFrequency(frequencyArr: string[]): void {
        frequencyArr.map((val): undefined => {
            const frequencyClip = val.split(' ') as [string, string, TimeUnits];
            const frequency = parseInt(frequencyClip[0], 10);
            if (frequency > 0 && frequencyClip[1] === 'per' && this.timeUnits.includes(frequencyClip[2])) {
                this.frequencyMap[frequencyClip[2]] = frequency;
            }

            return undefined;
        });
    }
}

function limiter(req: Request, res: Response, next: NextFunction): void {
    timeUnits.map((val): undefined => {
        const requestCount = requestRecord.get(val) ?? 0;
        requestRecord.set(val, requestCount + 1);
        return undefined;
    });

    console.log('Request received.');

    timeUnits.reverse().map((val): undefined => {
        console.log(val);
        const requestCount = requestRecord.get(val) as number;
        if (requestCount >= 10) {
            res.status(400).json({
                code: 400,
            });
        }
        next();
        return undefined;
    });
}
