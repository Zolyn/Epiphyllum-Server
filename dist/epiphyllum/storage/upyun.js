"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUSSDirectoryTree = void 0;
const path_1 = require("path");
const utils_1 = require("../utils");
function getUSSDirectoryTree({ service, operator, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        // 导入又拍云 node-sdk
        const [importErr, upyun] = yield (0, utils_1.awaitHelper)(Promise.resolve().then(() => __importStar(require('upyun'))));
        if (!upyun) {
            throw importErr;
        }
        const instance = new upyun.Service(service, operator, password);
        const client = new upyun.Client(instance);
        const directoryMap = {};
        function getDirectoryMap(path) {
            return __awaiter(this, void 0, void 0, function* () {
                const fileMetaList = [];
                const [err, currentFiles] = yield (0, utils_1.awaitHelper)(client.listDir(path));
                if (!currentFiles) {
                    if (typeof currentFiles === 'boolean') {
                        throw (0, utils_1.TE)('No such file or directory.');
                    }
                    throw (0, utils_1.E)(err);
                }
                for (const { type: fileType, name, time, size } of currentFiles.files) {
                    const { type, icon } = (0, utils_1.getFileTypeAndIcon)(name);
                    const fileMeta = {
                        isDir: false,
                        pathname: name,
                        transformedTime: (0, utils_1.transformTime)(time),
                        transformedSize: (0, utils_1.transformBytes)(size),
                        type,
                        icon,
                        time,
                        size,
                    };
                    if (fileType === 'F') {
                        const fullPath = (0, path_1.join)(path, name);
                        const [err] = yield (0, utils_1.awaitHelper)(getDirectoryMap(fullPath));
                        if (err) {
                            throw (0, utils_1.E)(err);
                        }
                        fileMeta.isDir = true;
                        fileMeta.icon = 'folder';
                        fileMeta.type = 'folder';
                    }
                    fileMetaList.push(fileMeta);
                }
                directoryMap[path] = {
                    pathname: path,
                    files: fileMetaList,
                };
            });
        }
        yield getDirectoryMap('/');
        return directoryMap;
    });
}
exports.getUSSDirectoryTree = getUSSDirectoryTree;
