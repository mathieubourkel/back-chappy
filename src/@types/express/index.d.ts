import * as jwt from 'jsonwebtoken'
import { HTTPMessagesEnum } from '../../enums/utils/http.messages.enum'

declare module 'express-serve-static-core' {
  export interface Request {
    user : jwt.CustomJwtPayload
  }

}

  declare module 'jsonwebtoken' {
    export interface CustomJwtPayload extends jwt.JwtPayload {
        userId: number
        email:string
    }
}
