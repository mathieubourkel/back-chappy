import { NextFunction, Request, Response } from "express";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithUserInfo } from "../interfaces/request.interface";
import { CustomError } from "../utils/CustomError";

export class AuthController extends GlobalController {

  private userService = new Service(User);

  private async __decryptPassword(input: string, bdd: string) {
    const result = await bcrypt.compare(input, bdd);
    return result;
  }

  private async __createTokens(userId: number, email: string, res:Response) {
    let date = new Date();
    const tokenDate = date.getHours() + 3;
    const refreshDate = date.getMonth() + 1;
    const token = jwt.sign(
      { userId, email, exirationDate: tokenDate },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      { userId, email, exirationDate: refreshDate },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1w" }
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
      const user: any = await this.userService.getOneBySearchOptions({email:req.body.email});
      if (!user) throw new CustomError("AUTH-C", 401, "Bad Credentials");
      const isPasswordMatched = await this.__decryptPassword(
        req.body.password,
        user.password
      );
      if (!isPasswordMatched) throw new CustomError("AUTH-C", 401, "Bad Credentials");
      return this.__createTokens(user.id, req.body.email, res);
    });
  }

  async refreshToken(req: RequestWithUserInfo, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user: any = await this.userService.getOneById(req.user.userId);
      if (!user) throw new CustomError("AUTH-C", 401, "No User");
      if (user.refreshToken != req.cookies.refreshToken) throw new CustomError("AUTH-C", 401, "Refresh Token not good");
      return this.__createTokens(user.id, user.email, res);
    });
  }

}
