import { Router } from "express";
import { UtilisateurController } from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/",(request, response) =>{
    const controller = new UtilisateurController(request,response)
    controller.getAllUsers();
});
UtilisateurController;
export default userRouter;