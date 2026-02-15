"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformsCommand = platformsCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const adapters_1 = require("../adapters");
const output_1 = require("../output");
function platformsCommand() {
    (0, store_1.ensureInitialized)();
    const config = (0, store_1.readConfig)();
    const available = (0, adapters_1.listAdapters)();
    const configured = Object.keys(config.platforms || {});
    if ((0, output_1.isJsonMode)())
        return (0, output_1.out)({ available, configured, platforms: config.platforms });
    console.log(chalk_1.default.bold('\n📡 Platforms\n'));
    console.log(chalk_1.default.bold('Configured:'));
    configured.forEach(p => {
        const hasKey = !!(config.platforms[p].apiKey || process.env.LATE_API_KEY);
        const status = hasKey ? chalk_1.default.green('●') : chalk_1.default.red('● no API key');
        console.log(`  ${status} ${p} (${config.platforms[p].adapter})`);
    });
    console.log(chalk_1.default.bold('\nAvailable adapters:'), available.join(', '));
    console.log();
}
