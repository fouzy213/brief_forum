import jwt from "jsonwebtoken";
export interface AuthRefreshTokenPayload {
  sub: string;
}
export class TokenService {
  private constructor() {}

  static signRefreshToken = (payload: AuthRefreshTokenPayload): string => {
    const secret = process.env.JWT_SECRET as string;

    const refrestTokenTTL = parseInt(process.env.JWT_RT_TTL || "43200");

    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: refrestTokenTTL,
    });
  };
  static verifyRefreshToken = (token: string): AuthRefreshTokenPayload => {
    const secret = process.env.JWT_SECRET as string;

    try {
      const decoded = jwt.verify(token, secret, {
        algorithms: ["HS256"],
      }) as AuthRefreshTokenPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token expiré");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Token invalide");
      }
      throw new Error("Erreur de vérification du token");
    }
  };
}
