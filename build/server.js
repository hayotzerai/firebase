"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.HttpServer = exports.application = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const loggingHandler_1 = require("./middleware/loggingHandler");
const crosHandler_1 = require("./middleware/crosHandler");
const routeNotFound_1 = require("./middleware/routeNotFound");
const config_1 = require("./config/config");
exports.application = (0, express_1.default)();
const Main = () => {
    console.info("--------------------------------------------------------------------");
    console.info("Initilized  API");
    console.info("--------------------------------------------------------------------");
    exports.application.use(express_1.default.urlencoded({ extended: true }));
    exports.application.use(express_1.default.json());
    console.info("--------------------------------------------------------------------");
    console.info("Configuration   API");
    console.info("--------------------------------------------------------------------");
    exports.application.use(loggingHandler_1.loggingHandler);
    exports.application.use(crosHandler_1.crosHandler);
    console.info("--------------------------------------------------------------------");
    console.info("Define  Controloer Ruting  API");
    console.info("--------------------------------------------------------------------");
    exports.application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ hello: 'Hello World' });
    });
    console.info("--------------------------------------------------------------------");
    console.info("Define Error Controloer Routing  API");
    console.info("--------------------------------------------------------------------");
    exports.application.use(routeNotFound_1.routeNotFound);
    console.info("--------------------------------------------------------------------");
    console.info("Starting Server ....");
    console.info("--------------------------------------------------------------------");
    exports.HttpServer = http_1.default.createServer(exports.application);
    exports.HttpServer.listen(config_1.SERVER_PORT, () => {
        console.info("--------------------------------------------------------------------");
        console.info("Server started : " + config_1.SERVER_HOSTNAME + ":" + config_1.SERVER_PORT);
        console.info("--------------------------------------------------------------------");
    });
};
exports.Main = Main;
const Shutdown = (callback) => exports.HttpServer && exports.HttpServer.close(callback);
exports.Shutdown = Shutdown;
(0, exports.Main)();
