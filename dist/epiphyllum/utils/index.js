"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TE = exports.E = exports.getFileTypeAndIcon = exports.transformBytes = exports.transformTime = exports.awaitHelper = void 0;
const path_1 = require("path");
/**
 * await帮助函数，帮助捕获异常
 * 由于只需要关心结果是否存在，err始终为string
 */
function awaitHelper(promise) {
    return promise.then((res) => ['', res]).catch((err) => [err, null]);
}
exports.awaitHelper = awaitHelper;
function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    }
    else {
        return time.toString();
    }
}
function transformTime(time) {
    const transformedRawDate = new Date(time * 1000);
    const year = transformedRawDate.getFullYear();
    const month = transformedRawDate.getMonth() + 1;
    const date = transformedRawDate.getDate();
    const hour = transformedRawDate.getHours();
    const minute = transformedRawDate.getMinutes();
    const second = transformedRawDate.getSeconds();
    return `${year}-${month}-${date} ${hour}:${formatTime(minute)}:${formatTime(second)}`;
}
exports.transformTime = transformTime;
function transformBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let result = '-';
    units.reduce((prev, val) => {
        if (!prev) {
            return prev;
        }
        const transformedBytes = parseFloat((bytes / prev).toFixed(2));
        if (transformedBytes < 1024 || val === 'GB') {
            result = `${transformedBytes} ${val}`;
            return 0;
        }
        return prev * 1024;
    }, 1);
    return result;
}
exports.transformBytes = transformBytes;
const E = (err) => new Error(err);
exports.E = E;
const TE = (err) => new TypeError(err);
exports.TE = TE;
// const LiteLogger: Logger = {
//     err: (msg) => console.log(`${chalk.bgRed(' ERROR ')} ${msg}`),
//     info: (msg) => console.log(`${chalk.bgBlue(' INFO ')} ${msg}`),
//     debug: (msg) => console.log(`${chalk.bgGray('DEBUG')}`, msg),
//     throw: (msg) => {
//         throw new Error(msg);
//     },
// };
const fileTypeMap = [
    {
        suffix: ['txt', 'log', 'out'],
        type: 'text',
        icon: 'node-text',
    },
    {
        suffix: ['png', 'jpg', 'webm', 'gif'],
        type: 'image',
        icon: 'file-image',
    },
    {
        suffix: ['doc', 'docx'],
        type: 'word',
        icon: 'file-word',
    },
    {
        suffix: ['xls', 'xlsx', 'et'],
        type: 'excel',
        icon: 'file-excel',
    },
    {
        suffix: ['ppt', 'pptx'],
        type: 'powerpoint',
        icon: 'file-powerpoint',
    },
    {
        suffix: ['zip', 'rar', '7z', 'tar', 'gz', 'zst', 'lzma', 'iso', 'jar'],
        type: 'zip',
        icon: 'zip-box',
    },
    {
        suffix: ['mp4', 'mkv', 'wmv', 'flv'],
        type: 'video',
        icon: 'file-video',
    },
    {
        suffix: ['mp3', 'ogg', 'wav', 'aac'],
        type: 'music',
        icon: 'file-music',
    },
    {
        suffix: ['pdf'],
        type: 'pdf',
        icon: 'file-pdf',
    },
    {
        suffix: ['md'],
        type: 'markdown',
        icon: 'language-markdown',
    },
    {
        suffix: ['js'],
        type: 'javascript',
        icon: 'language-javascript',
    },
    {
        suffix: ['ts'],
        type: 'typescript',
        icon: 'language-typescript',
    },
    {
        suffix: ['vue'],
        type: 'vue',
        icon: 'vuejs',
    },
    {
        suffix: ['css'],
        type: 'css',
        icon: 'language-css-3',
    },
    {
        suffix: ['json'],
        type: 'json',
        icon: 'code-json',
    },
];
const transformedFileTypeMap = new Map(fileTypeMap.map((val) => val.suffix.map((suffix) => [suffix, val])).flat());
function getFileTypeAndIcon(name) {
    const fileTypeObject = transformedFileTypeMap.get((0, path_1.extname)(name).slice(1));
    const normalFile = {
        suffix: [],
        type: 'file',
        icon: 'file-cloud',
    };
    return fileTypeObject !== null && fileTypeObject !== void 0 ? fileTypeObject : normalFile;
}
exports.getFileTypeAndIcon = getFileTypeAndIcon;
