"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyCommand = historyCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function historyCommand() {
    (0, store_1.ensureInitialized)();
    const history = (0, store_1.readHistory)();
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)(history);
    if (!history.length) {
        console.log(chalk_1.default.dim('No published posts yet'));
        return;
    }
    console.log(chalk_1.default.bold(`\n  ID        Status      Platform  Text`));
    console.log(chalk_1.default.dim('  ' + '─'.repeat(70)));
    history.forEach(p => console.log('  ' + (0, output_1.formatPost)(p, true)));
    console.log();
}
