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
exports.EpiphyllumEntry = void 0;
const utils_1 = require("./utils");
const upyun_1 = require("./storage/upyun");
function EpiphyllumEntry() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const [importErr, module] = yield (0, utils_1.awaitHelper)(Promise.resolve().then(() => __importStar(require('../epiphyllum.config'))));
        if (!module) {
            throw (0, utils_1.E)(importErr);
        }
        const config = module.default;
        let result;
        let treeError = 'Unknown error';
        switch (config.storage) {
            case 'upyun': {
                const upyunEnv = {
                    service: (_a = process.env.UPYUN_SERVICE) !== null && _a !== void 0 ? _a : '',
                    operator: (_b = process.env.UPYUN_OPERATOR) !== null && _b !== void 0 ? _b : '',
                    password: (_c = process.env.UPYUN_PASSWORD) !== null && _c !== void 0 ? _c : '',
                };
                const storageConfig = (_d = config.storageConfig) !== null && _d !== void 0 ? _d : upyunEnv;
                [treeError, result] = yield (0, utils_1.awaitHelper)((0, upyun_1.getUSSDirectoryTree)(storageConfig));
            }
        }
        if (!result) {
            throw (0, utils_1.E)(treeError);
        }
        return {
            host: config.host,
            result,
        };
    });
}
exports.EpiphyllumEntry = EpiphyllumEntry;
