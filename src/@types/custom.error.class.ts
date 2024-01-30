import { HTTPMessagesEnum } from "../enums/utils/http.messages.enum"

export class CustomError {

    codePerso:string
    status: number
    message: string

    constructor( codePerso: string, status:number, message?:string){      
        this.codePerso = codePerso
        this.status = status
        this.message = message || HTTPMessagesEnum[status]
    }
}