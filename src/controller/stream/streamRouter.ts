import { Router } from "express"
import { stream} from "./controller/streamController";

export const routers:Router = Router();

routers.post('/stream',stream);

