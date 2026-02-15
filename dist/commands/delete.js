"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommand = deleteCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function deleteCommand(id) {
    (0, store_1.ensureInitialized)();
    const posts = (0, store_1.readQueue)();
    const idx = posts.findIndex(p => p.id === id || p.id.startsWith(id));
    if (idx === -1) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Post not found' });
        console.error(chalk_1.default.red(`Post not found: ${id}`));
        process.exit(1);
    }
    const removed = posts.splice(idx, 1)[0];
    (0, store_1.writeQueue)(posts);
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ success: true, deleted: removed.id });
    console.log(chalk_1.default.green(`✓ Deleted post ${chalk_1.default.dim(removed.id.slice(0, 8))}`));
}
