import {Router} from "express";
import { SnippetController } from './../controllers/SnippetControllers';

const snippetRouter = Router();

snippetRouter.get('/',(request,response) =>{
const controller = new SnippetController(request,response)
controller.getAllSnippet();
})
SnippetController
export default snippetRouter