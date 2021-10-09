import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

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
    private readonly timeUnits: TimeUnits[] = ['day', 'hour', 'minute'];
    private readonly timeFormat: Record<TimeUnits, string> = {
        minute: 'DD HH:mm',
        hour: 'DD HH',
        day: 'DD',
    };

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

    public limiter = (_: Request, res: Response, next: NextFunction): void => {
        const currentTime = moment().add(8, 'h');
        let isLimited = false;
        this.timeUnits.map((val): void => {
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

        res.json(this);
    };

    private addCount(unit: TimeUnits, time: string): number {
        let value: number = this.requestRecord[unit][time] ?? 0;
        this.requestRecord[unit][time] = ++value;
        return value;
    }

    private setFrequency(frequencyArr: string[]): void {
        frequencyArr.map((val): void => {
            const frequencyClip = val.split(' ') as [string, string, TimeUnits];
            const frequency = parseInt(frequencyClip[0], 10);
            if (frequency > 0 && frequencyClip[1] === 'per' && this.timeUnits.includes(frequencyClip[2])) {
                this.frequencyMap[frequencyClip[2]] = frequency;
            }
        });
    }
}

export default RequestLimiter;
