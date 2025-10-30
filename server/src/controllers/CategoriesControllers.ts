import { Controller } from '../libs/Controller';
import * as categoriesModel from '../models/categoriesModel';

export class CategoriesController extends Controller {
  public async getAllCategories() {
    try {
      const categorie = await categoriesModel.getAllCategories();
      this.response.json(categorie);
    } catch (error) {
      console.error(error);
      this.response.status(500).json({ error: 'Erreur serveur' });
    }
  }
}