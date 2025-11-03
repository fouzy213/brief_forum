import { Controller } from '../libs/Controller';
import * as utilisateurModel from '../models/utilisateurModel';

export class UtilisateurController extends Controller {
  public async getAllUsers() {
    try {
      const users = await utilisateurModel;
      this.response.json(users);
    } catch (error) {
      console.error(error);
      this.response.status(500).json({ error: 'Erreur serveur' });
    }
  }
}