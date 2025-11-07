import { Response } from "express";

export class CookieService {

    private static readonly httpOnly : boolean =true
private static readonly sameSite: 'lax' | 'strict' | 'none' = 'lax';
    private static readonly domain : string | undefined;
    private static readonly path:string = "/";
private static readonly secure: boolean = false; // autoriser HTTP local

    private constructor (){}


static setRefreshCookie = (res: Response, jwt: string) => {
  return res.cookie("refreshToken", jwt, {
    httpOnly: this.httpOnly,
    path: this.path,
    sameSite: this.sameSite, 
    secure: this.secure,     
    expires: new Date(
      new Date().getTime() + parseInt(process.env.JWT_RT_TTL ?? "43200") * 1000
    ),
  });
};


static clearRefreshCookie = (res: Response) => {
  return res.clearCookie("refreshToken", {
    httpOnly: this.httpOnly,
    path: this.path,
    sameSite: this.sameSite, 
    secure: this.secure,     
  });
};

}