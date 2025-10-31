import { Controller } from "../libs/Controller";
import * as snippetModel from "../models/snippetModels";

export class SnippetController extends Controller {
  public async getAllSnippet() {
    try {
      const Snippet = await snippetModel.getAllSnippet();
      this.response.json(Snippet);
    } catch (error) {
      console.error(error);
      this.response.status(500).json({ error: "Erreur serveur" });
    }
  }

 public async getSnippetById() {
  try {
    const id = parseInt(this.request.params.id);
    const Snippet = await snippetModel.getSnippetById(id);

    if (!Snippet) {
      return this.response.status(404).json({ error: `Aucun snippet trouvé avec l'id ${id}` });
    }

    this.response.json(Snippet);
  } catch (error) {
    console.error("❌ Erreur getSnippetById:", error);
    this.response.status(500).json({ error: "Erreur serveur" });
  }
}

public async getSnippetsByLangage() {
  try {
    const nom = this.request.params.nom;
    const Snippet = await snippetModel.getSnippetsByLangage(nom); 
    this.response.json(Snippet);
  } catch (error) {
    console.error("❌ Erreur getSnippetsByCategorie:", error);
    this.response.status(500).json({ error: "Erreur serveur" });
  }
}

public async getSnippetsByCategorie() {
  try {
    const nom = this.request.params.nom;
    const Snippet = await snippetModel.getSnippetsByCategorie(nom); 
    this.response.json(Snippet);
  } catch (error) {
    console.error(error);
    this.response.status(500).json({ error: "Erreur serveur" });
  }
}
}