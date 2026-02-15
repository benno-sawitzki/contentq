"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setJsonMode = setJsonMode;
exports.isJsonMode = isJsonMode;
exports.out = out;
exports.formatPost = formatPost;
const chalk_1 = __importDefault(require("chalk"));
let jsonMode = false;
function setJsonMode(v) { jsonMode = v; }
function isJsonMode() { return jsonMode; }
function out(data) {
    if (jsonMode) {
        console.log(JSON.stringify(data, null, 2));
    }
}
const statusColors = {
    draft: chalk_1.default.gray,
    scheduled: chalk_1.default.yellow,
    published: chalk_1.default.green,
    failed: chalk_1.default.red,
};
function formatPost(p, short = false) {
    const color = statusColors[p.status] || chalk_1.default.white;
    const id = chalk_1.default.dim(p.id.slice(0, 8));
    const status = color(p.status.padEnd(10));
    const platform = chalk_1.default.cyan(p.platform);
    const text = p.text.length > 60 ? p.text.slice(0, 57) + '...' : p.text;
    if (short)
        return `${id}  ${status}  ${platform}  ${text}`;
    const lines = [
        `${chalk_1.default.bold('ID:')}        ${p.id}`,
        `${chalk_1.default.bold('Status:')}    ${color(p.status)}`,
        `${chalk_1.default.bold('Platform:')}  ${platform}`,
        `${chalk_1.default.bold('Created:')}   ${p.createdAt}`,
    ];
    if (p.scheduledFor)
        lines.push(`${chalk_1.default.bold('Scheduled:')} ${p.scheduledFor}`);
    if (p.publishedAt)
        lines.push(`${chalk_1.default.bold('Published:')} ${p.publishedAt}`);
    if (p.tags.length)
        lines.push(`${chalk_1.default.bold('Tags:')}      ${p.tags.join(', ')}`);
    if (p.template)
        lines.push(`${chalk_1.default.bold('Template:')}  ${p.template}`);
    lines.push(`${chalk_1.default.bold('Text:')}\n${p.text}`);
    return lines.join('\n');
}
