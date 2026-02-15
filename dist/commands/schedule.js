"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCommand = scheduleCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function scheduleCommand(id, dateStr) {
    (0, store_1.ensureInitialized)();
    const posts = (0, store_1.readQueue)();
    const idx = posts.findIndex(p => p.id === id || p.id.startsWith(id));
    if (idx === -1) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Post not found' });
        console.error(chalk_1.default.red(`Post not found: ${id}`));
        process.exit(1);
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Invalid date' });
        console.error(chalk_1.default.red('Invalid date format'));
        process.exit(1);
    }
    posts[idx].status = 'scheduled';
    posts[idx].scheduledFor = date.toISOString();
    (0, store_1.writeQueue)(posts);
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ success: true, post: posts[idx] });
    console.log(chalk_1.default.green(`✓ Scheduled for ${date.toLocaleString()}`));
}
