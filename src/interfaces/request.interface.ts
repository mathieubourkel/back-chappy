import { Request } from "express";

export interface RequestWithUserInfo extends Request {
    user : {
        email: string,
        userId: number
    }
}