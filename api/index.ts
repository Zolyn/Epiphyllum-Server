import { VercelRequest, VercelResponse } from '@vercel/node';
import { awaitHelper } from '../epiphyllum/utils';
import { EpiphyllumEntry, EpiphyllumEntryReturn } from '../epiphyllum';

interface Response {
    status: number;
    errorMsg: string;
    data?: EpiphyllumEntryReturn;
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
    const [err, val] = await awaitHelper(EpiphyllumEntry());

    const response: Response = {
        status: 200,
        errorMsg: '',
    };

    if (!val) {
        response.status = 500;
        response.errorMsg = err;
        res.json(response);
        return;
    }

    response.data = val;
    res.json(response);
}
