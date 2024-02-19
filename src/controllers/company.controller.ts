import { NextFunction, Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";
import { CompanyDto } from "../dto/company.dto";
import { plainToInstance } from "class-transformer";
import { CompanyEntity } from "../entities/company.entity";
import { validate } from "class-validator";
import { CustomError } from "../middlewares/error.handler.middleware";

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<{ company: CompanyEntity; message: string; date: Date }> {
    try {
      const companyToValidate = plainToInstance(CompanyDto, req.body);
      let errors = await validate(companyToValidate);
      if (errors.length > 0) {
        const array = errors.map((error) => {
          return error.constraints;
        });
        console.log(array);
        throw new CustomError(
          "CC-Failed-DTO",
          400,
          "Veuillez vérifier vos informations"
        );
      }
      const existingCompany = await this.companyService.getByName(companyToValidate.name)
      if (existingCompany) {
        throw new CustomError(
          "COMPANY_ALREADY_EXISTS_ERROR",
          400,
          "une erreur c'est produite lors de la création de votre compte"
        );
      }
      return {
        company: await this.companyService.create(companyToValidate),
        message: "Entreprise créé avec succès",
        date: new Date(),
      };
    } catch (error) {
      if (error instanceof CustomError) {
        error.sendError(res);
      } else {
        console.error("error", error);
        const message = error.message
          ? error.message
          : "Une erreur s'est produite lors du traitement de votre demande.";
        res.status(500).send(message);
      }
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const companyDto: CompanyDto = req.body;
      const updateCompany = await this.companyService.update(
        +req.params.id,
        companyDto
      );
      const response = {
        message: "Modification apporté avec succès",
        company: updateCompany,
      };
      return response;
    } catch (error) {
      console.error("Erreur lors de la modification de l'entreprise:", error);
      return { message: error.message };
    }
  }

  async getAllCompanies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const companies = await this.companyService.getAll();
      console.log(companies);
      return {
        data: { companies },
        message: "Voici toutes les entreprises enregistrées à ce jour",
        date: new Date(),
      };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de toutes les entreprises :",
        error
      );
      return { message: error.message };
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deletedCompany = await this.companyService.delete(parseInt(id));
      if (!deletedCompany) {
        return { message: "L'entreprise n'a pas été trouvée." };
      }
      return { message: "L'entreprise a été supprimée avec succès." };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'entreprise :", error);
      return { message: error.message };
    }
  }

  // private userService = new Service(UserEntity)

  // async createWhenLogged(req: Request, res: Response, next: NextFunction) {
  //   await this.handleGlobal(req, res, next, async () => {
  //     const user:UserEntity = await this.userService.getOneById(req.user.userId, ["myCompany"], {id: true, company: true})
  //     if (!user) throw new CustomError("CC-USERNOTFIND", 400)
  //     if (user.myCompany) throw new CustomError("CC-ALREADY-OWNER", 400)
  //     this.delCache(CacheEnum.COMPANIES)
  //     req.body.owner = req.user.userId
  //     return await this.companyService.create(req.body);
  //   });
  // }
}
