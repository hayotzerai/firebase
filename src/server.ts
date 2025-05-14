import http from 'http'
import express from 'express'
import { loggingHandler } from './middleware/loggingHandler';
import { crosHandler } from './middleware/crosHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { routers as customers } from './controller/customers/customerRouters';

import {stream} from './controller/stream/controller/streamController';

export const application = express();
export let HttpServer: ReturnType<typeof http.createServer>;



export const Main = () => {

    console.info("--------------------------------------------------------------------");
    console.info("Initilized  API");
    console.info("--------------------------------------------------------------------");
    application.use(express.urlencoded({extended:true}));
    application.use(express.json());

    console.info("--------------------------------------------------------------------");
    console.info("Configuration   API");
    console.info("--------------------------------------------------------------------");

    application.use(loggingHandler)
    application.use(crosHandler);

    console.info("--------------------------------------------------------------------");
    console.info("Define  Customers API Ruting  API");
    console.info("--------------------------------------------------------------------");

    application.use('/api/customers',customers);
    application.use('/stream',stream);

    
    console.info("--------------------------------------------------------------------");
    console.info("Define Error Controloer Routing  API");
    console.info("--------------------------------------------------------------------");

    application.use(routeNotFound);
    
    console.info("--------------------------------------------------------------------");
    console.info("Starting Server ...." );
    console.info("--------------------------------------------------------------------");

    HttpServer = http.createServer(application);
    HttpServer.listen(SERVER_PORT, () => {     
    console.info("--------------------------------------------------------------------");
    console.info("Server started : " + SERVER_HOSTNAME + ":" + SERVER_PORT );
    console.info("--------------------------------------------------------------------");
    })


};

export const Shutdown = (callback:any) => HttpServer && HttpServer.close(callback);

Main();


