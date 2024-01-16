import { NextFunction, Request, Response } from "express";
import jwt, { CustomJwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/CustomError";

export async function verifyToken(request: Request,response: Response,next: NextFunction) {
  try {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    if (!token) throw new CustomError("MDW-TK", 401, "No token find");
    if (type !== "Bearer") throw new CustomError("MDW-TK", 401, "No bearer find");
    request["user"] = <CustomJwtPayload>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    response
        .status(401)
        .json({code: "MDW-TK",message: "jwt expired",expiredAt: error.expiredAt});
  }
}

export async function verifyRefresh(request: Request,response: Response,next: NextFunction) {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) throw new CustomError("MDW-TK-REF", 401, "No refresh token find");
    request["user"] = <CustomJwtPayload>jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET );
    next();
  } catch (error) {
    response
      .status(401)
      .json({code: "MDW-TK-REF",message: "refresh token expired",expiredAt: error.expiredAt});
  }
}
