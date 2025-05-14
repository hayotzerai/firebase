import { Router } from "express"
import { customers , cust,get,set} from "./controller/customersController";

export const routers:Router = Router();

routers.post('/',customers);
routers.get('/cust',cust)
routers.get('/:id',get)
routers.post('/add',set);

