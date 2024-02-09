import { HttpMessagesUtils } from "../utils/http.messages.utils";
import { Response } from "express";

export class CustomError {

    codePerso:string
    status: number
    message: string
    date: string

    constructor( codePerso: string, status:number, message?:string){
        this.codePerso = codePerso
        this.status = status || 500
        this.message = message || HttpMessagesUtils[status]
        this.date = new Date().toLocaleString('fr-FR', {timeZone: process.env.TZ})
    }

    sendError(res: Response) {
      res.status(this.status).json({ message: this.message, code: this.codePerso, status: this.status, date: this.date });
    };
}