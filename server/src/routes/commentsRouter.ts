import { Router } from 'express';
import { CommentControllers} from '../controllers/CommentControllers';

const commentsRouter = Router();

commentsRouter.get('/snippets/:snippetId/comments',(req,res) =>{
 new CommentControllers(req,res).getSnippetComments()
   
});

commentsRouter.post('/snippets/:snippetId/comments', (req, res) => {
  new CommentControllers(req, res).createComment();
});

export default commentsRouter;

