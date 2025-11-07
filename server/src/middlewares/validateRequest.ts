import { NextFunction, Request, Response} from "express";
import {z} from 'zod';
export const validateRequest = (
    req: Request,
    res:Response,
    next: NextFunction
) =>{
    let schema: z.ZodTypeAny | null = null;
    const methodKey = req.method.toUpperCase();
    const pathKey = req.route?.path || "";

    if(methodKey === "POST" && pathKey === "/signup"){
        schema = signUpSchema
    }
    if(!schema) return next();

    const parsed = schema.safeParse(req.body);

    if(!parsed.success){
        const message = parsed.error.issues[0]?.message || "Donnée invalide";
        return res.status(400).json({message})
    }
    req.body = parsed.data;

    next();
};

const signUpSchema = z.object({
    email:z.email('format email invalide'),
    nom:z
        .string({error:"Pseudo requis"})
        .min(3,'pseudo trop court 3minimum'),
    password:z
        .string({error:'Mot de passe requis'})
        .min(6,'mot de passe trop cour 6 caractère minimum'),
    passwordVerify:z.string({error:'Mot de passe requis'}),
    })
        .refine((data)=> data.password === data.passwordVerify,{
    message:"Confirmation du mot de passe est érroné",
    path:["passwordVerify"]
    }
    );
    
/* const loginSchema = z.object({
    email:z.email('format email invalide'),
    password:z
    .string({error:"erreur mot de pass"})

});
 */