import { Request, Response } from "express";
import User from "../models/utilisateurModel";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Controller } from "../libs/Controller";
import { CookieService } from "../services/CookieService";
import { TokenService } from "../services/TokenService";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AuthController extends Controller {
  constructor(request: Request, response: Response) {
    super(request, response);
  }

  async register() {
    try {
      const { email, nom, password } = this.request.body;

      if (!email || !nom || !password) {
        return this.response.status(400).json({ message: "Champs manquants" });
      }

      const password_hash = await argon2.hash(password);
      const user = await User.create(email, nom, password_hash);

    const userId = user?.getId();
if (!userId) {
  return this.response.status(500).json({ message: "Erreur création utilisateur" });
}

// 🔹 Générer un refresh token
const refreshToken = TokenService.signRefreshToken({ sub: userId.toString() });

// 🔹 Sauvegarder le token dans la table jeton
await prisma.jeton.create({
  data: {
    valeur_jeton: refreshToken,
    id_utilisateur: userId,
  },
});

      // 🔹 Mettre le cookie
      CookieService.setRefreshCookie(this.response, refreshToken);

      // Renvoyer la réponse au client
      return this.response.status(201).json(user.serialize());
    } catch (errore) {
      console.error("❌ Erreur register:", errore);
      return this.response.status(500).json({ message: "Problème serveur" });
    }
  }


  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email ou mot de passe manquant" });
      }

      // Récupérer l'utilisateur
      const user = await User.getAllUsers().then((users) =>
        users.find((user) => user.getEmail() === email)
      );

      if (!user)
        return res.status(401).json({ error: "Utilisateur non trouvé" });

      const valid = await argon2.verify(user.getPasswordHash(), password);
      if (!valid)
        return res.status(401).json({ error: "Mot de passe incorrect" });

      // Générer JWT
      const token = jwt.sign({ id: user.getId() }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res.json({ token, user: user.serialize() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // 🔹 Récupérer tous les utilisateurs
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.getAllUsers();
      res.json(users.map((user) => user.serialize()));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // 🔹 Récupérer un utilisateur par ID
  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await User.getById(id);
      if (!user)
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      res.json(user.serialize());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
