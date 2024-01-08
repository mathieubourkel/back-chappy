import { NextFunction, Request, Response } from "express";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithRefresh } from "../middlewares/RequestWithUserInfo";

export class AuthController extends GlobalController {
  private userService = new Service(User);

 
  private async __decryptPassword(input: string, bdd: string) {
    const result = await bcrypt.compare(input, bdd);
    return result;
  }

  private async __createTokens(userId: number, email: string) {
    let date = new Date();
    const tokenDate = date.getHours() + 3;
    const refreshDate = date.getMonth() + 1;
    const token = jwt.sign(
      { userId, email, exirationDate: tokenDate },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" }
    );
    const refreshToken = jwt.sign(
      { userId, email, exirationDate: refreshDate },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "4w" }
    );
    await this.userService.update(userId, { refreshToken });
    return { token, refreshToken };
  }

  async login(req: Request, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user: any = await this.userService.getOneBySearchOptions({email:req.body.email});
      if (!user) throw new Error("no user");
      const isPasswordMatched = await this.__decryptPassword(
        req.body.password,
        user.password
      );

      if (!isPasswordMatched) throw new Error("bad pwd");
      return this.__createTokens(user.userId, req.body.email);
    });
  }

  async refreshToken(req: RequestWithRefresh, res: Response, next: NextFunction) {
    await this.handleGlobal(req, res, next, async () => {
      const user: any = await this.userService.getOneBySearchOptions(req.body.email);
      if (!user || user.refreshToken != req.refreshToken) throw new Error("no refresh");
      this.__createTokens(user.userId, req.body.email);
    });
  }

}
