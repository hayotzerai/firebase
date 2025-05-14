import { Request, Response, NextFunction } from "express";

export function loggingHandler(req:Request , res:Response, next:NextFunction){
    console.info(`Incoming Method :[${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`)

    res.on('Finished ', () =>{

        console.info(`Incoming Method :[${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}] - STATUS:[${res.statusCode}]`)
    });

    next();
}