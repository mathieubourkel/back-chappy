import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { validate } from "class-validator";
import { errorHandlerMiddleware } from "./error.handler.middleware";
import { plainToInstance } from "class-transformer";

export async function verifyDtoMiddleware(req: Request, res: Response, next: NextFunction, classDto?) {
  try {
    if (req.body && Object.values(req.body).length != 0){
        if (req.method === 'GET') throw new CustomError("GET-WITH-BODY", 400)
        const bodyToValidate = plainToInstance(classDto, req.body)
        const errors = await validate(bodyToValidate, { whitelist: true });
        console.log(errors)
        if (errors.length > 0) {
            throw new CustomError("MDW-DTO-CHECK", 400, JSON.stringify(errors));
        }
        req.body = bodyToValidate
    } 
    next();
  } catch (error) {
    errorHandlerMiddleware(error, res);
  }
}