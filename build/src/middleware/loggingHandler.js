"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingHandler = void 0;
function loggingHandler(req, res, next) {
    console.info(`Incoming Method :[${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`);
    res.on('Finished ', () => {
        console.info(`Incoming Method :[${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}] - STATUS:[${res.statusCode}]`);
    });
    next();
}
exports.loggingHandler = loggingHandler;
