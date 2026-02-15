"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCommand = editCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function editCommand(id, text, opts) {
    (0, store_1.ensureInitialized)();
    const posts = (0, store_1.readQueue)();
    const idx = posts.findIndex(p => p.id === id || p.id.startsWith(id));
    if (idx === -1) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Post not found' });
        console.error(chalk_1.default.red(`Post not found: ${id}`));
        process.exit(1);
    }
    if (text)
        posts[idx].text = text;
    if (opts.platform)
        posts[idx].platform = opts.platform;
    if (opts.tags)
        posts[idx].tags = opts.tags.split(',').map(t => t.trim());
    (0, store_1.writeQueue)(posts);
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ success: true, post: posts[idx] });
    console.log(chalk_1.default.green(`✓ Updated post ${chalk_1.default.dim(posts[idx].id.slice(0, 8))}`));
}
