"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdapter = getAdapter;
exports.listAdapters = listAdapters;
const linkedin_1 = require("./linkedin");
const adapters = {
    linkedin: linkedin_1.linkedinAdapter,
};
function getAdapter(name) {
    return adapters[name];
}
function listAdapters() {
    return Object.keys(adapters);
}
