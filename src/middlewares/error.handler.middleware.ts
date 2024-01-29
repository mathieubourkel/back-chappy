import { CustomError } from "../utils/CustomError";
import { HTTPMessages } from "../utils/HTTPMessages";
import { Response } from "express";

export const errorHandlerMiddleware = async ( err: CustomError, res: Response) => {
    const status = err.status || 500;
    const message = err.message || HTTPMessages[500];
    res.status(status).json({ error: message, code: err.codePerso, status });
  };