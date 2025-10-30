import { Router } from "express";
import userRouter from "./userRouter";
import categoriesRouter from "./categoriesRouter";
import snippetRouter from "./snippetRouter";
const router = Router();
router.use("/user",userRouter);
router.use("/categories",categoriesRouter)
router.use("/snippet",snippetRouter)
export default router