import {Router} from "express";
import { CategoriesController } from "../controllers/CategoriesControllers";

const categoriesRouter = Router();
categoriesRouter.get('/',(request,response) =>{
const controller = new CategoriesController(request,response)
controller.getAllCategories();
})
CategoriesController


export default categoriesRouter