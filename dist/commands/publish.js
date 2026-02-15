"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishCommand = publishCommand;
const chalk_1 = __importDefault(require("chalk"));
const store_1 = require("../store");
const adapters_1 = require("../adapters");
const output_1 = require("../output");
async function publishPost(post, config) {
    const platformConfig = config.platforms?.[post.platform];
    if (!platformConfig) {
        post.status = 'failed';
        post.publishResult = { error: `No config for platform: ${post.platform}` };
        return post;
    }
    const adapter = (0, adapters_1.getAdapter)(platformConfig.adapter || post.platform);
    if (!adapter) {
        post.status = 'failed';
        post.publishResult = { error: `No adapter for: ${platformConfig.adapter || post.platform}` };
        return post;
    }
    const result = await adapter.publish(post, platformConfig);
    if (result.success) {
        post.status = 'published';
        post.publishedAt = new Date().toISOString();
    }
    else {
        post.status = 'failed';
    }
    post.publishResult = result;
    return post;
}
async function publishCommand(id, opts) {
    (0, store_1.ensureInitialized)();
    const config = (0, store_1.readConfig)();
    const queue = (0, store_1.readQueue)();
    const history = (0, store_1.readHistory)();
    if (opts.pending) {
        const now = new Date();
        const due = queue.filter(p => p.status === 'scheduled' && p.scheduledFor && new Date(p.scheduledFor) <= now);
        if (!due.length) {
            if ((0, output_1.isJsonMode)())
                return (0, output_1.out)({ published: 0 });
            console.log(chalk_1.default.dim('No pending posts to publish'));
            return;
        }
        const results = [];
        for (const post of due) {
            await publishPost(post, config);
            if (post.status === 'published') {
                history.push(post);
                results.push({ id: post.id, success: true });
                if (!(0, output_1.isJsonMode)())
                    console.log(chalk_1.default.green(`✓ Published ${chalk_1.default.dim(post.id.slice(0, 8))}`));
            }
            else {
                results.push({ id: post.id, success: false, error: post.publishResult.error });
                if (!(0, output_1.isJsonMode)())
                    console.log(chalk_1.default.red(`✗ Failed ${chalk_1.default.dim(post.id.slice(0, 8))}: ${post.publishResult.error}`));
            }
        }
        const remaining = queue.filter(p => p.status !== 'published');
        (0, store_1.writeQueue)(remaining);
        (0, store_1.writeHistory)(history);
        if ((0, output_1.isJsonMode)())
            (0, output_1.out)({ published: results.filter(r => r.success).length, results });
        return;
    }
    if (!id) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Provide post ID or --pending' });
        console.error(chalk_1.default.red('Provide a post ID or use --pending'));
        process.exit(1);
    }
    const idx = queue.findIndex(p => p.id === id || p.id.startsWith(id));
    if (idx === -1) {
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: 'Post not found' });
        console.error(chalk_1.default.red(`Post not found: ${id}`));
        process.exit(1);
    }
    await publishPost(queue[idx], config);
    if (queue[idx].status === 'published') {
        history.push(queue[idx]);
        queue.splice(idx, 1);
        (0, store_1.writeQueue)(queue);
        (0, store_1.writeHistory)(history);
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: true, post: history[history.length - 1] });
        console.log(chalk_1.default.green(`✓ Published!`));
    }
    else {
        (0, store_1.writeQueue)(queue);
        if ((0, output_1.isJsonMode)())
            return (0, output_1.out)({ success: false, error: queue[idx].publishResult.error });
        console.log(chalk_1.default.red(`✗ Failed: ${queue[idx].publishResult.error}`));
    }
}
