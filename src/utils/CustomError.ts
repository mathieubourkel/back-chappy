import { HTTPMessages } from "./HTTPMessages"

export class CustomError {
    message: string
    date: Date
    status: number
    codePerso:string

    constructor( codePerso: string, status?:number, message?:string){
        this.date = new Date()
        this.message = message || HTTPMessages[status]
        this.codePerso = codePerso
        this.status = status
    }
}
