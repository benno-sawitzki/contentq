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
exports.addCommand = addCommand;
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function addCommand(text, opts) {
    (0, store_1.ensureInitialized)();
    let content = text;
    if (opts.from) {
        if (!fs.existsSync(opts.from)) {
            if ((0, output_1.isJsonMode)())
                return (0, output_1.out)({ success: false, error: `File not found: ${opts.from}` });
            console.error(chalk_1.default.red(`File not found: ${opts.from}`));
            process.exit(1);
        }
        content = fs.readFileSync(opts.from, 'utf-8').trim();
    }
    if (!content) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'No content provided' });
        console.error(chalk_1.default.red('Provide text or use --from <file>'));
        process.exit(1);
    }
    const config = (0, store_1.readConfig)();
    const platform = opts.platform || config.defaults?.platform || 'linkedin';
    const tags = opts.tags ? opts.tags.split(',').map(t => t.trim()) : [];
    const post = {
        id: (0, uuid_1.v4)(),
        text: content,
        platform,
        status: 'draft',
        createdAt: new Date().toISOString(),
        scheduledFor: null,
        publishedAt: null,
        publishResult: {},
        tags,
        template: opts.template || null,
    };
    const queue = (0, store_1.readQueue)();
    queue.push(post);
    (0, store_1.writeQueue)(queue);
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ success: true, post });
    console.log(chalk_1.default.green(`✓ Added post ${chalk_1.default.dim(post.id.slice(0, 8))} [${platform}]`));
}
