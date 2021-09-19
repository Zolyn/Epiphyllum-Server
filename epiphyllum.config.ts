import { EpiphyllumConfig, UpyunSdk } from './epiphyllum/types';

const Config: EpiphyllumConfig<UpyunSdk> = {
    storage: 'upyun',
    host: 'https://repo-zorin.beaa.cn',
};

export default Config;
