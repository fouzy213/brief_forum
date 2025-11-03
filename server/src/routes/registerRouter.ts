import { Router } from "express";
import AuthController from "../controllers/AuthControllers";
import { validateRequest } from "../middlewares/validateRequest";

const registeroute = Router();

registeroute.post("/register", validateRequest, (req, res) => {
  new AuthController(req, res).register();
});

export default registeroute;
