"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crosHandler = void 0;
function crosHandler(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,GET');
        return res.status(200).json({});
    }
    next();
}
exports.crosHandler = crosHandler;
