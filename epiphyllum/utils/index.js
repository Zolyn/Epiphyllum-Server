'use strict';
exports.__esModule = true;
exports.TE =
    exports.E =
    exports.getFileTypeAndIcon =
    exports.transformBytes =
    exports.transformTime =
    exports.LiteLogger =
    exports.awaitHelper =
        void 0;
var chalk_1 = require('chalk');
var path_1 = require('path');
/**
 * await帮助函数，帮助捕获异常
 * 由于只需要关心结果是否存在，err始终为string
 */
function awaitHelper(promise) {
    return promise
        .then(function (res) {
            return ['', res];
        })
        ['catch'](function (err) {
            return [err, null];
        });
}
exports.awaitHelper = awaitHelper;
function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    } else {
        return time.toString();
    }
}
function transformTime(time) {
    var transformedRawDate = new Date(time * 1000);
    var year = transformedRawDate.getFullYear();
    var month = transformedRawDate.getMonth() + 1;
    var date = transformedRawDate.getDate();
    var hour = transformedRawDate.getHours();
    var minute = transformedRawDate.getMinutes();
    var second = transformedRawDate.getSeconds();
    return year + '-' + month + '-' + date + ' ' + hour + ':' + formatTime(minute) + ':' + formatTime(second);
}
exports.transformTime = transformTime;
function transformBytes(bytes) {
    var units = ['B', 'KB', 'MB', 'GB'];
    var result = '-';
    units.reduce(function (prev, val) {
        if (!prev) {
            return prev;
        }
        var transformedBytes = parseFloat((bytes / prev).toFixed(2));
        if (transformedBytes < 1024 || val === 'GB') {
            result = transformedBytes + ' ' + val;
            return 0;
        }
        return prev * 1024;
    }, 1);
    return result;
}
exports.transformBytes = transformBytes;
var E = function (err) {
    return new Error(err);
};
exports.E = E;
var TE = function (err) {
    return new TypeError(err);
};
exports.TE = TE;
var LiteLogger = {
    err: function (msg) {
        return console.log(chalk_1.whiteBright.bgRed(' ERROR ') + ' ' + msg);
    },
    info: function (msg) {
        return console.log(chalk_1.whiteBright.bgBlue(' INFO ') + ' ' + msg);
    },
    debug: function (msg) {
        return console.log('' + chalk_1.whiteBright.bgGray('DEBUG'), msg);
    },
    throw: function (msg) {
        throw new Error(msg);
    },
};
exports.LiteLogger = LiteLogger;
var fileTypeMap = [
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
var transformedFileTypeMap = new Map(
    fileTypeMap
        .map(function (val) {
            return val.suffix.map(function (suffix) {
                return [suffix, val];
            });
        })
        .flat(),
);
function getFileTypeAndIcon(name) {
    var fileTypeObject = transformedFileTypeMap.get(path_1.extname(name).slice(1));
    var normalFile = {
        suffix: [],
        type: 'file',
        icon: 'file-cloud',
    };
    return fileTypeObject !== null && fileTypeObject !== void 0 ? fileTypeObject : normalFile;
}
exports.getFileTypeAndIcon = getFileTypeAndIcon;
