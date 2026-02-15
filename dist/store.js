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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCqDir = getCqDir;
exports.ensureInitialized = ensureInitialized;
exports.readQueue = readQueue;
exports.writeQueue = writeQueue;
exports.readHistory = readHistory;
exports.writeHistory = writeHistory;
exports.readConfig = readConfig;
exports.writeConfig = writeConfig;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("yaml"));
const CQ_DIR = '.contentq';
function getCqDir() {
    return path.resolve(process.cwd(), CQ_DIR);
}
function ensureInitialized() {
    if (!fs.existsSync(getCqDir())) {
        console.error('Not initialized. Run: contentq init');
        process.exit(1);
    }
}
function readQueue() {
    const p = path.join(getCqDir(), 'queue.json');
    if (!fs.existsSync(p))
        return [];
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}
function writeQueue(posts) {
    fs.writeFileSync(path.join(getCqDir(), 'queue.json'), JSON.stringify(posts, null, 2));
}
function readHistory() {
    const p = path.join(getCqDir(), 'history.json');
    if (!fs.existsSync(p))
        return [];
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}
function writeHistory(posts) {
    fs.writeFileSync(path.join(getCqDir(), 'history.json'), JSON.stringify(posts, null, 2));
}
function readConfig() {
    const p = path.join(getCqDir(), 'config.yaml');
    if (!fs.existsSync(p))
        return { platforms: {} };
    return yaml.parse(fs.readFileSync(p, 'utf-8')) || { platforms: {} };
}
function writeConfig(config) {
    fs.writeFileSync(path.join(getCqDir(), 'config.yaml'), yaml.stringify(config));
}
