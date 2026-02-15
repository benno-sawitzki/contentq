"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCommand = showCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function showCommand(id) {
    (0, store_1.ensureInitialized)();
    const posts = (0, store_1.readQueue)();
    const post = posts.find(p => p.id === id || p.id.startsWith(id));
    if (!post) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ error: 'Post not found' });
        console.error(chalk_1.default.red(`Post not found: ${id}`));
        process.exit(1);
    }
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)(post);
    console.log('\n' + (0, output_1.formatPost)(post) + '\n');
}
