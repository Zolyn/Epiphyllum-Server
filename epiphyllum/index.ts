import { awaitHelper, DirectoryMap, E } from './utils';
import { getUSSDirectoryTree } from './storage/upyun';
import { UpyunSdk, EpiphyllumConfig, SDKs } from './types';
interface EpiphyllumEntryReturn {
    host: string;
    result: DirectoryMap;
}

async function EpiphyllumEntry(): Promise<EpiphyllumEntryReturn> {
    // @ts-ignore
    const [importErr, module] = await awaitHelper(import('../../epiphyllum.config'));

    if (!module) {
        throw E(importErr);
    }

    const config: EpiphyllumConfig<SDKs> = module.default;

    let result: DirectoryMap | null;
    let treeError = 'Unknown error';

    switch (config.storage) {
        case 'upyun': {
            const upyunEnv: UpyunSdk = {
                service: process.env.UPYUN_SERVICE ?? '',
                operator: process.env.UPYUN_OPERATOR ?? '',
                password: process.env.UPYUN_PASSWORD ?? '',
            };

            const storageConfig: UpyunSdk = (config.storageConfig as UpyunSdk) ?? upyunEnv;
            [treeError, result] = await awaitHelper(getUSSDirectoryTree(storageConfig));
        }
    }

    if (!result) {
        throw E(treeError);
    }

    return {
        host: config.host,
        result,
    };
}

export { EpiphyllumEntry, EpiphyllumEntryReturn };
