import { Router } from "express";
import userRouter from "./userRouter";
import categoriesRouter from "./categoriesRouter";
import snippetRouter from "./snippetRouter";
import languageRouter from "./languagesRouter";
import preciseRouter from "./preciseRouter";
const router = Router();
router.use("/user",userRouter);
router.use("/categories",categoriesRouter)
router.use("/snippet",snippetRouter)
router.use("/languages",languageRouter)
router.use("/precise",preciseRouter)


export default router