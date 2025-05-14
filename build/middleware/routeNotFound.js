"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = routeNotFound;
function routeNotFound(req, res, next) {
    const error = new Error('Route Not Found');
    console.info(error);
    return res.status(404).json({ error: error.message });
}
