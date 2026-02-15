"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = listCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function listCommand(opts) {
    (0, store_1.ensureInitialized)();
    let posts = (0, store_1.readQueue)();
    if (opts.status)
        posts = posts.filter(p => p.status === opts.status);
    if (opts.platform)
        posts = posts.filter(p => p.platform === opts.platform);
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)(posts);
    if (!posts.length) {
        console.log(chalk_1.default.dim('Queue is empty'));
        return;
    }
    console.log(chalk_1.default.bold(`\n  ID        Status      Platform  Text`));
    console.log(chalk_1.default.dim('  ' + '─'.repeat(70)));
    posts.forEach(p => console.log('  ' + (0, output_1.formatPost)(p, true)));
    console.log();
}
