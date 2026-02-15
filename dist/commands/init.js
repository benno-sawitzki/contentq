"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = initCommand;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function initCommand() {
    const dir = (0, store_1.getCqDir)();
    if (fs.existsSync(dir)) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Already initialized' });
        console.log(chalk_1.default.yellow('Already initialized in .contentq/'));
        return;
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.mkdirSync(path.join(dir, 'templates'), { recursive: true });
    const config = {
        platforms: {
            linkedin: {
                adapter: 'linkedin',
                apiKey: '',
                accountId: '698f07784525118cee8daad0',
                profileId: '698e1a7211ffd99f0d2eebd9',
            },
        },
        defaults: {
            platform: 'linkedin',
        },
    };
    (0, store_1.writeConfig)(config);
    (0, store_1.writeQueue)([]);
    (0, store_1.writeHistory)([]);
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ success: true, path: dir });
    console.log(chalk_1.default.green('✓ Initialized .contentq/'));
    console.log(chalk_1.default.dim('  Edit .contentq/config.yaml to add your API keys'));
}
