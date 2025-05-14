"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const express_1 = require("express");
const streamController_1 = require("./controller/streamController");
exports.routers = (0, express_1.Router)();
exports.routers.post('/stream', streamController_1.stream);
