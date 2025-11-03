import { Response } from "express";

export class CookieService {

    private static readonly httpOnly : boolean =true
    private static readonly sameSite : string = 'lax'
    private static readonly secure:boolean = process.env.NODE_ENV === "production";
    private static readonly domain : string | undefined;
    private static readonly path:string = "/";


    private constructor (){}


    static setRefreshCookie = (res: Response,jwt:string) =>{
        return res.cookie("refreshToken", jwt,{
            httpOnly:this.httpOnly,
            path:this.path,
            expires:new Date(
                new Date().getTime() + 
                    parseInt(process.env.JWT_RT_TTL ?? "43200") * 1000
                ),
        })
    }
}