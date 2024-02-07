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

    async update(id: number, body: {
        name: string,
        siret: string,
        description: string
    }): Promise<CompanyEntity> {
        try {
            const companyUpdate = await this.companyRepository.findOne({ where: { id }});
            if (!companyUpdate) {
                throw new Error("Company not found");
            }
            const existingCompany = await this.companyRepository.findOne({ where: { name: body.name } });
            if (existingCompany && existingCompany.id !== id) {
                throw new Error("Company name already exists");
            }
            return this.companyRepository.save(this.companyRepository.merge(companyUpdate, body))
        } catch (error) {
            console.log("error", error)
            throw new Error(error)
        }
        };

        async getAll(): Promise<CompanyEntity[]> {
            try {
                const company = await this.companyRepository.find();
                return company;
            } catch (error) {
                console.error("Erreur lors de la récupération de toutes les entreprises :", error);
                throw new Error("Échec de la récupération de toutes les entreprises");
            }
        };
};