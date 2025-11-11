import { Router } from "express";
import categoriesRouter from "./categoriesRouter";
import snippetRouter from "./snippetRouter";
import languageRouter from "./languagesRouter";
import preciseRouter from "./preciseRouter";
import registeroute from "./registerRouter";
import commentsRouter from "./commentsRouter";
const router = Router();
router.use("/auth", registeroute);
router.use("/categories",categoriesRouter)
router.use("/snippet",snippetRouter)
router.use("/languages",languageRouter)
router.use("/precise",preciseRouter)
router.use("/",commentsRouter);
export default router