import { Request } from "express";

export interface RequestWithUserInfo extends Request {
    user : {
        email: string,
        userId: number
    }
}

export interface RequestWithRefresh extends RequestWithUserInfo {
    refreshToken: string
}