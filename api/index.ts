import { VercelRequest, VercelResponse } from '@vercel/node';
import { awaitHelper, LiteLogger as Logger } from '../epiphyllum/utils';
import { EpiphyllumEntry, EpiphyllumEntryReturn } from '../epiphyllum';

interface Response {
    status: number;
    data?: EpiphyllumEntryReturn;
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
    const [err, val] = await awaitHelper(EpiphyllumEntry());

    const response: Response = {
        status: 200,
    };

    if (!val) {
        Logger.err(err);
        response.status = 500;
        res.json(response);
        return;
    }

    response.data = val;
    res.json(response);
}
