import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function tokensMiddleware(request:Request, response:Response, next:NextFunction, isRefresh?:boolean){

    try {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        let payload:any;
        if (!token) throw new Error("no token find");
        if (type !== "Bearer") throw new Error("no Bearer")
        if (isRefresh) {
            payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            request['refreshToken'] = token;
        } else {
            payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        }
        request['user'] = payload;
        next();
    } catch (error) {
        response.status(401).json(error.message)
    }
}