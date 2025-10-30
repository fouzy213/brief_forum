import { Controller } from '../libs/Controller';
import * as snippetModel from '../models/snippetModels';

export class SnippetController extends Controller {
  public async getAllSnippet() {
    try {
      const Snippet = await snippetModel.getAllSnippet();
      this.response.json(Snippet);
    } catch (error) {
      console.error(error);
      this.response.status(500).json({ error: 'Erreur serveur' });
    }
  }
}