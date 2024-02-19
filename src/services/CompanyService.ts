import { dataBaseSource } from "../data-source";
import { CompanyEntity } from "../entities/company.entity";
import { CompanyDto } from "../dto/company.dto";
import { CustomError } from "../middlewares/error.handler.middleware";

export class CompanyService {
  private companyRepository =
    dataBaseSource.AppDataSource.getRepository<CompanyEntity>(CompanyEntity);

  async create(body: {name:string, siret: string, description: string }): Promise<CompanyEntity> {
    try {
      const company = await this.companyRepository.save(
        this.companyRepository.create(body)
      );
      console.log(company);
      return company;
    } catch (error) {
      console.log("error", error);
      throw new CustomError("CC-FAILED", 400, "Une erreur c'est produite lors de l'enregistrement de votre entreprise");
    }
  }

  async getById(id:number):Promise<CompanyEntity>{
    try {
      return await this.companyRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new CustomError("ID_NOT_FOUND", 400, "Une erreur c'est produite lors de la récupération de vos données")
    }
  }

  async getByName(name:string):Promise<CompanyEntity>{
    try {
      return await this.companyRepository.findOne({
        where: { name },
      });
    } catch (error) {
      throw new CustomError("NAME_NOT_FOUND", 400, "Une erreur c'est produite lors de la récupération de vos données")
    }
  }

  async update(
    id: number,
    body: {name: string, siret: string, description: string}
  ): Promise<CompanyEntity> {
    try {
      const companyUpdate =await this.getById(id)
      console.log("🚀 ~ CompanyService ~ companyUpdate:", companyUpdate)
      return this.companyRepository.save(
        this.companyRepository.merge(companyUpdate, body)
      );
    } catch (error) {
      console.log("error", error);
      throw new CustomError("UC-FAILED", 400, "Une erreur c'est produite lors de la modification de votre entreprise");
    }
  }

  async getAll(): Promise<CompanyEntity[]> {
    try {
      const company = await this.companyRepository.find();
      return company;
    } catch (error) {
      console.error(
        "error",
        error
      );
      throw new CustomError("GC-FAILED", 400, "Échec de la récupération de toutes les entreprises");
    }
  }

  async delete(id: number): Promise<unknown> {
    const company = await this.companyRepository.findOne({ where: { id } });
    return this.companyRepository.delete(id);
  }
}
