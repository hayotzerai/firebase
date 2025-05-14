"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
const openai_1 = require("openai");
const config_1 = require("../config/config");
exports.openai = new openai_1.OpenAI({
    apiKey: config_1.openaiConfig.apiKey,
});
