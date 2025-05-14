"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.octokit = void 0;
const rest_1 = require("@octokit/rest");
const config_js_1 = require("../config/config.js"); // 👈 Ensure `.js` is used if `"module": "ESNext"` or `"type": "module"`
exports.octokit = new rest_1.Octokit({
    auth: config_js_1.githubToken,
});
