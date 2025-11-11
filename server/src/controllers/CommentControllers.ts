import { Controller } from "../libs/Controller";
import * as commentModel from "../models/commentModel";

export class CommentControllers extends Controller {
  public async createComment() {
    try {
      const { snippetId } = this.request.params;
      const { texte } = this.request.body;

      const session = (this.request as any).session;
      
      if (!session?.user) {
        return this.response.status(401).json({ error: 'Non connecté' });
      }

      const userId = session.user.id_utilisateur;

      const comment = await commentModel.createComment(
        parseInt(snippetId),
        userId,
        texte
      );

      this.response.status(201).json(comment);
      
    } catch (error) {
      console.error('Erreur création commentaire:', error);
      this.response
        .status(500)
        .json({ error: "Erreur lors de la création du commentaire" });
    }
  }

  public async getSnippetComments() {
    try {
      const { snippetId } = this.request.params;
      const comments = await commentModel.getCommentsBySnippet(
        parseInt(snippetId)
      );
      this.response.json(comments);
    } catch (error) {
      console.error("Erreur récupération commentaires:", error);
      this.response
        .status(500)
        .json({ error: "Erreur lors de la récupération des commentaires" });
    }
  }
}