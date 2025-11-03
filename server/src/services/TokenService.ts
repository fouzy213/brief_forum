import  jwt  from 'jsonwebtoken';
export interface AuthRefreshTokenPayload {
  sub: string;
}
export class TokenService {
  private constructor() {}

  static signRefreshToken = (payload: AuthRefreshTokenPayload): string => {
    const secret = process.env.JWT_SECRET as string;
      console.log("JWT_SECRET:", secret);

    const refrestTokenTTL = parseInt(process.env.JWT_RT_TTL || "43200");

    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: refrestTokenTTL,
    });
  };
}
