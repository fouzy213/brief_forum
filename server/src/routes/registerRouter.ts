import { Router } from "express";
import AuthController from "../controllers/AuthControllers";
import { validateRequest } from "../middlewares/validateRequest";

const registeroute = Router();

registeroute.post("/register", validateRequest, (req, res) => {
  new AuthController(req, res).register();
});

registeroute.post("/login", (req, res) => {
  new AuthController(req, res).login();
});

registeroute.post("/logout",(req, res) => {
  new AuthController(req, res).logout();
});

registeroute.get("/me",(req,res)=>{
new AuthController(req, res).me();

})


export default registeroute;
