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
        return this.response
          .status(500)
          .json({ message: "Erreur création utilisateur" });
      }

      //  Générer un refresh token
      const refreshToken = TokenService.signRefreshToken({
        sub: userId.toString(),
      });

      //  Sauvegarder le token dans la table jeton
      await prisma.jeton.create({
        data: {
          valeur_jeton: refreshToken,
          id_utilisateur: userId,
        },
      });

      //  Mettre le cookie
      CookieService.setRefreshCookie(this.response, refreshToken);

      // Renvoyer la réponse au client
      return this.response.status(201).json(user.serialize());
    } catch (errore) {
      console.error("❌ Erreur register:", errore);
      return this.response.status(500).json({ message: "Problème serveur" });
    }
  }

async login() {
  try {
    const { email, password } = this.request.body;
    if (!email || !password) {
      return this.response
        .status(400)
        .json({ error: "Email ou mot de passe manquant" });
    }

    // 1️ Récupérer l'utilisateur par email
    const row = await prisma.utilisateur.findUnique({ where: { email } });
    if (!row) {
      return this.response
        .status(401)
        .json({ error: "Utilisateur non trouvé" });
    }

    const user = User.fromRow(row);

    //  Vérification de l'ID ici
    const userId = user.getId();
    if (!userId) {
      return this.response.status(500).json({ error: "Utilisateur invalide" });
    }

    //  Vérifier le mot de passe
    const valid = await argon2.verify(user.getPasswordHash(), password);
    if (!valid) {
      return this.response
        .status(401)
        .json({ error: "Mot de passe incorrect" });
    }

    //  Supprimer les anciens refresh tokens
    await prisma.jeton.deleteMany({ where: { id_utilisateur: userId } });

    //  Générer un nouveau refresh token
    const refreshToken = TokenService.signRefreshToken({
      sub: userId.toString(),
    });

    //   Sauvegarder le refresh token
    await prisma.jeton.create({
      data: {
        valeur_jeton: refreshToken,
        id_utilisateur: userId,
      },
    });

    //   Mettre le cookie
    CookieService.setRefreshCookie(this.response, refreshToken);

    //  Générer un access token classique
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    //  Envoyer la réponse
    return this.response.json({ token: accessToken, user: user.serialize() });

  } catch (err: any) {
    console.error("❌ Erreur login:", err);
    this.response.status(500).json({ error: "Erreur serveur" });
  }
}



  async logout() {
  try {
    // 1️⃣ Récupérer le token depuis le cookie ou l'authorization header
    const token =
      this.request.cookies?.refreshToken ||
      this.request.headers.authorization?.split(" ")[1];

    if (!token) {
      return this.response
        .status(400)
        .json({ message: "Aucun token fourni pour la déconnexion" });
    }

    // 2️⃣ Supprimer le token de la table jeton
    await prisma.jeton.deleteMany({
      where: { valeur_jeton: token },
    });

    // 3️⃣ Supprimer le cookie
    CookieService.clearRefreshCookie(this.response);

    // 4️⃣ Retourner une réponse de succès
    return this.response.status(200).json({ message: "Déconnexion réussie ✅" });
  } catch (err) {
    console.error("❌ Erreur logout:", err);
    return this.response.status(500).json({ message: "Erreur serveur" });
  }
}
async me() {
  try {
    // Récupérer le token depuis le cookie
    const token = this.request.cookies?.refreshToken;

    if (!token) {
      return this.response.status(401).json({ message: "Non authentifié" });
    }

    // Vérifier le token
    const decoded = TokenService.verifyRefreshToken(token);

    // Récupérer l'utilisateur
    const userId = parseInt(decoded.sub);
    const user = await User.getById(userId);

    if (!user) {
      return this.response.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return this.response.status(200).json(user.serialize());

  } catch (err) {
    console.error("❌ Erreur me():", err);
    return this.response.status(401).json({ message: "Token invalide" });
  }
}




}