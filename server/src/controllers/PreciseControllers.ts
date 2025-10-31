import { Controller } from "../libs/Controller";
import * as preciseModel from "../models/preciseModel";


export class PreciseController extends Controller {
  public async getAllprecise() {
    try {
      const precise = await preciseModel.getAllprecise();
      this.response.json(precise);
    } catch (error) {
      console.error(error);
      this.response.status(500).json({ error: 'Erreur serveur' });
    }
  }
}