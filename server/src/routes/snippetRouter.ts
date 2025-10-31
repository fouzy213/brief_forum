import {Router} from "express";
import { SnippetController } from './../controllers/SnippetControllers';

const snippetRouter = Router();

snippetRouter.get('/',(request,response) =>{
const controller = new SnippetController(request,response)
controller.getAllSnippet();
})

snippetRouter.get('/langage/:nom', (request, response) => {
  const controller = new SnippetController(request, response);
  controller.getSnippetsByLangage();
});

snippetRouter.get('/categorie/:nom', (request, response) => {
  const controller = new SnippetController(request, response);
  controller.getSnippetsByCategorie();
});
snippetRouter.get('/:id', (request, response) => {
  const controller = new SnippetController(request, response);
  controller.getSnippetById();
});






export default snippetRouter