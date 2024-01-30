import { NextFunction, Request, Response } from "express";
import jwt, { CustomJwtPayload } from "jsonwebtoken";
import { CustomError } from "./error.handler.middleware";

export async function verifyTokenMiddleware(req: Request,res: Response,next: NextFunction) {
  try {
    const [type, token] = req.headers.authorization?.split(" ") ?? [];
    if (!token) throw {code:"MDW-TK", status: 401, message:"No token find"};
    if (type !== "Bearer") throw {code:"MDW-TK", status: 401, message:"No bearer find"};
    req["user"] = <CustomJwtPayload>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    if (error.message === 'jwt expired') error.status = 401 ; error.codePerso = "MDW-TK"
    if (error.message === 'invalid signature') error.status = 401 ; error.codePerso = "MDW-TK"
    new CustomError(error.codePerso, error.status, error.message).sendError(res)
  }
}

export async function verifyRefreshMiddleware(req: Request,res: Response,next: NextFunction) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw {code:"MDW-TK-REFRESH", status: 401, message:"No refresh token find"};
    req["user"] = <CustomJwtPayload>jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET );
    next();
  } catch (error) {
    if (error.message === 'jwt expired') error.status = 401 ; error.codePerso = "MDW-TK-REFRESH"
    if (error.message === 'invalid signature') error.status = 401 ; error.codePerso = "MDW-TK-REFRESH"
    new CustomError(error.codePerso, error.status, error.message).sendError(res)
  }
}
