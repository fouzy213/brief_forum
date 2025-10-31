import { Controller } from '../libs/Controller';
import * as languageModel from '../models/languagesModel';

export class LanguagesController extends Controller {
  public async getAllLanguages() {
    try {
      const language = await languageModel.getAllLanguages();
      this.response.json(language);
    } catch (error) {
      console.error(error);
      this.response.status(500).json({ error: 'Erreur serveur' });
    }
  }
}