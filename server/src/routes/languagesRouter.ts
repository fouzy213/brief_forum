import { LanguagesController } from './../controllers/LanguageControllers';
import {Router} from "express";

const languageRouter = Router();

languageRouter.get('/',(request,response) =>{
const controller = new LanguagesController(request,response)
controller.getAllLanguages();
})
LanguagesController
export default languageRouter