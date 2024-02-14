import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import bcrypt from "bcrypt";
import { CompanyEntity } from "../entities/company.entity";
import { CustomError } from "../middlewares/error.handler.middleware";
import { UserService } from "../services/UserService";
import { UserDto } from "../dto/user.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: UserDto = req.body;
      console.log(userDto)
      const result = {
        user: await this.userService.create( userDto),
        message: "Utilisateur créé avec succès",
        date: new Date(),
      };
      return result;
    } catch (error) {
      console.log("error", error)
      return {message: error.message}
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: UserDto = req.body;
      const updateUser = await this.userService.update(
        +req.params.id,
        userDto
      );
      const response = {
        message: "Modification apporté avec succès",
        company: updateUser,
        date: new Date
      };
      return response;
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
      return {message: error.message}
    }
  }
  
  async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await this.userService.getAll();
      return {
        data: { users },
        message: "Voici tous les utilisateurs enregistrés à ce jour",
        date: new Date(),
      };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de tous les utilisateurs :",
        error
      );
      return {message: error.message}
    }
  };

  async delete(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const deletedUser = await this.userService.delete(parseInt(id));
      if (!deletedUser) {
        res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        return;
      }
      return { message: 'L\'utilisateur a été supprimée avec succès.'};
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      return {message: error.message}
    }
  }

 

  // async getInfosUserConnected(req:Request, res:Response, next:NextFunction) {
  //   await this.handleGlobal(req, res, next, async ()=> {
  //     return this.userService.getOneById(+req.user.userId, [ "projects", "myOwnTasks", "participations", "company", "myCompany"]);
  //   })
  // }

  

  // async update(req: Request, res: Response, next: NextFunction) {
  //   await this.handleGlobal(req, res, next, async () => {
  //     const user:UserEntity = await this.userService.getOneById(req.user.userId, [], {id: true})
  //     if (!user) throw new CustomError("UC-USER-NOTFIND", 400);
  //     return this.userService.update(user.id, req.body);
  //   });
  // }

  // async companyRejoin(req: Request, res: Response, next: NextFunction) {
  //   await this.handleGlobal(req, res, next, async () => {
  //     return this.userService.update(+req.user.userId, {company: +req.body.id},['company']);
  //   });
  // }

  // async resetPwd(req: Request, res: Response, next: NextFunction) {
  //   await this.handleGlobal(req, res, next, async () => {
  //     const user:UserEntity = await this.userService.getOneBySearchOptions({email: req.body.email}, [], {id: true, password: true})
  //     if (!user) throw new CustomError("UC-USER-NOTFIND", 400);
  //     const isPasswordMatched:boolean = await this.__decryptPassword(req.body.oldPassword, user.password);
  //     if (!isPasswordMatched) throw new CustomError("AUTH-C", 401, "Bad Credentials");
  //     req.body.newPassword = await this.__hashPassword(req.body.newPassword)
  //     return this.userService.update(user.id, {password: req.body.newPassword});
  //   });
  // }

  // async quitCompany(req: Request, res: Response, next: NextFunction):Promise<void> {
  //   await this.handleGlobal(req, res, next, async () => {
  //     const user:UserEntity = await this.userService.getOneById<UserEntity>(+req.user.userId,["company"]);
  //     if (!user) throw new CustomError("UC-DEL-NOTFIND", 400);
  //     user.company.id = null
  //     return await this.userService.update(user.id, user, ["company"]);
  //   });
  // }
}
