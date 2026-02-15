"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsCommand = statsCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const output_1 = require("../output");
function statsCommand() {
    (0, store_1.ensureInitialized)();
    const queue = (0, store_1.readQueue)();
    const history = (0, store_1.readHistory)();
    const all = [...queue, ...history];
    const byStatus = {};
    const byPlatform = {};
    all.forEach(p => {
        byStatus[p.status] = (byStatus[p.status] || 0) + 1;
        byPlatform[p.platform] = (byPlatform[p.platform] || 0) + 1;
    });
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ total: all.length, byStatus, byPlatform });
    console.log(chalk_1.default.bold('\n📊 Content Queue Stats\n'));
    console.log(chalk_1.default.bold('By Status:'));
    Object.entries(byStatus).forEach(([k, v]) => console.log(`  ${k.padEnd(12)} ${v}`));
    console.log(chalk_1.default.bold('\nBy Platform:'));
    Object.entries(byPlatform).forEach(([k, v]) => console.log(`  ${k.padEnd(12)} ${v}`));
    console.log(`\n  ${chalk_1.default.bold('Total:')} ${all.length}\n`);
}
