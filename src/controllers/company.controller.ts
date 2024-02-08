import { NextFunction, Request, Response } from "express";
import { CompanyEntity, resDataCompanyClean } from "../entities/company.entity";
import { Service } from "../services/Service";
import { GlobalController } from "./controller";
import { CacheEnum } from "../enums/cache.enum";
import { CustomError } from "../middlewares/error.handler.middleware";
import { UserEntity } from "../entities/user.entity";
import { CompanyService } from "../services/CompanyService";
import { CompanyDto } from "../dto/company.dto";

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyDto: CompanyDto = req.body;
      const newCompany = await this.companyService.create(companyDto);
      res.status(201).json(newCompany);
    } catch (error) {
      console.error("Erreur lors de la création de l'entreprise:", error);
      next();
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
      res.status(201).json(response);
    } catch (error) {
      console.error("Erreur lors de la modification de l'entreprise:", error);
      next();
    }
  }

  async getAllCompanies(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const companies = await this.companyService.getAll();
      console.log(companies)
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
      res
        .status(500)
        .json({
          message: "Échec de la récupération de toutes les entreprises",
        });
    }
  };

  async delete(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const deletedCompany = await this.companyService.delete(parseInt(id));
      if (!deletedCompany) {
        res.status(404).json({ message: `L'entreprise avec l'ID ${id} n'a pas été trouvée.` });
        return;
      }
      res.json({ message: 'L\'entreprise a été supprimée avec succès.', deletedCompany});
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entreprise :', error);
      res.status(500).json({ message: 'Échec de la suppression de l\'entreprise.' });
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

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   await this.handleGlobal(req, res, next, async () => {
  //     const result:CompanyEntity = await this.companyService.getOneById<CompanyEntity>(+req.params.id, ["owner"], resDataCompanyClean);
  //     if (!result) throw new CustomError("CC-COMPANYT-NOTFIND", 400);
  //     if (result.owner.id !== req.user.userId) throw new CustomError("CC-NO-RIGHTS", 403);
  //     this.delCache(CacheEnum.COMPANIES)
  //     return this.companyService.delete(result.id);
  //   });
  // }
}
