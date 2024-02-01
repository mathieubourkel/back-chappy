import { NextFunction, Request, Response } from 'express';
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { UserEntity } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from '../middlewares/error.handler.middleware';

export class AuthController extends GlobalController {

  private userService = new Service(UserEntity);

  private async __decryptPassword(inputFromRequest: string, passwordFromUserBDD: string):Promise<boolean> {
    return await bcrypt.compare(inputFromRequest, passwordFromUserBDD);
  }

  private async __createTokens(userId: number, email: string, res:Response) {
    let date:Date = new Date();
    const tokenDate:number = date.setHours(date.getHours() + 3)
    const refreshDate:number = date.setDate(date.getDate() + 4 * 7)
    const token:string = jwt.sign(
      { userId, email, exirationDate: tokenDate },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "9h" }
    );
    const refreshToken:string = jwt.sign(
      { userId, email, exirationDate: refreshDate },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "4w" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      maxAge:700000000,
      secure: process.env.NODE_ENV === 'production',
    })

    const {id, firstname, lastname, status} = await this.userService.update(userId, { refreshToken });
    const user = {id, firstname, lastname, status, email}
    return { token, user };
  }

  async login(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user:UserEntity = await this.userService.getOneBySearchOptions({email:req.body.email});
      if (!user) throw new CustomError("AUTH-C", 401, "Bad Credentials");
      const isPasswordMatched:boolean = await this.__decryptPassword(req.body.password,user.password);
      if (!isPasswordMatched) throw new CustomError("AUTH-C", 401, "Bad Credentials");
      return await this.__createTokens(user.id, req.body.email, res);
    });
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user:UserEntity = await this.userService.getOneById(req.user.userId);
      if (!user) throw new CustomError("AUTH-C", 401, "No User");
      if (user.refreshToken != req.cookies.refreshToken) throw new CustomError("AUTH-C", 401, "Refresh Token not good");
      return await this.__createTokens(user.id, user.email, res);
    });
  }

}
