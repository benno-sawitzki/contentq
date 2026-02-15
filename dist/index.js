#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const output_1 = require("./output");
const init_1 = require("./commands/init");
const add_1 = require("./commands/add");
const list_1 = require("./commands/list");
const show_1 = require("./commands/show");
const edit_1 = require("./commands/edit");
const delete_1 = require("./commands/delete");
const publish_1 = require("./commands/publish");
const schedule_1 = require("./commands/schedule");
const stats_1 = require("./commands/stats");
const platforms_1 = require("./commands/platforms");
const history_1 = require("./commands/history");
const program = new commander_1.Command();
program
    .name('contentq')
    .description('Content queue manager for marketing')
    .version('1.0.0')
    .option('--json', 'Output as JSON')
    .hook('preAction', (cmd) => {
    if (cmd.opts().json)
        (0, output_1.setJsonMode)(true);
});
program.command('init')
    .description('Initialize .contentq/ in current directory')
    .action(init_1.initCommand);
program.command('add [text]')
    .description('Add a post to the queue')
    .option('--from <file>', 'Read content from file')
    .option('-p, --platform <platform>', 'Target platform')
    .option('-t, --tags <tags>', 'Comma-separated tags')
    .option('--template <name>', 'Template name')
    .action(add_1.addCommand);
program.command('list')
    .description('List queued posts')
    .option('-s, --status <status>', 'Filter by status')
    .option('-p, --platform <platform>', 'Filter by platform')
    .action(list_1.listCommand);
program.command('show <id>')
    .description('Show post details')
    .action(show_1.showCommand);
program.command('edit <id> [text]')
    .description('Edit a queued post')
    .option('-p, --platform <platform>', 'Change platform')
    .option('-t, --tags <tags>', 'Update tags')
    .action(edit_1.editCommand);
program.command('delete <id>')
    .description('Remove a post from queue')
    .action(delete_1.deleteCommand);
program.command('publish [id]')
    .description('Publish a post or all pending')
    .option('--pending', 'Publish all due scheduled posts')
    .action(publish_1.publishCommand);
program.command('schedule <id> <date>')
    .description('Schedule a post for later')
    .action(schedule_1.scheduleCommand);
program.command('stats')
    .description('Show queue statistics')
    .action(stats_1.statsCommand);
program.command('platforms')
    .description('List configured platforms')
    .action(platforms_1.platformsCommand);
program.command('history')
    .description('Show published posts log')
    .action(history_1.historyCommand);
program.parse();
