import { PreciseController } from "../controllers/PreciseControllers";
import {Router} from "express";

const preciseRouter = Router();
preciseRouter.use("/",(request,response) =>{
const controller = new PreciseController(request,response)
controller.getAllprecise();
PreciseController
})
export default preciseRouter;