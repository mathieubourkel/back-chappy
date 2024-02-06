import { dataBaseSource } from "../data-source";
import { CompanyEntity } from "../entities/company.entity";

export class CompanyService {
    private companyRepository = dataBaseSource.AppDataSource.getRepository<CompanyEntity>(CompanyEntity);

    async create(body: {
        name: string,
        siret: string,
        description: string
    }): Promise<CompanyEntity> {
        try {
            const company = await this.companyRepository.save(this.companyRepository.create(body))
            console.log(company)
            return company
        } catch (error) {
            console.log("error", error)
            throw new Error(error)
        }
    };
};