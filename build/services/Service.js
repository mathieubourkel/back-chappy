"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const CustomError_1 = require("../utils/CustomError");
const data_source_1 = require("../data-source");
class Service {
    repository;
    // Dans chaque controlleur, on instancie un service avec comme paramètre
    // une entity
    // Cela permet d'utiliser un global "repository" dans les fonctions
    constructor(entity) {
        this.repository = data_source_1.AppDataSource.getRepository(entity);
    }
    // Function global du service qui gère la logique du try/catch er des erreurs
    async handleService(name, callback) {
        try {
            return await callback();
        }
        catch (error) {
            // gestion des erreurs, renvoie une 500 car innatendu dans le service
            // ainsi qu'un tag "SER" puis le nom de la fonction en parametre
            // de chaque autres fonctions
            throw new CustomError_1.CustomError(`SER-${name}`, 500, error.message);
        }
    }
    // chaque fonction appelle via callback la fonction globale
    async getAll(relations) {
        return this.handleService("GET-ALL", async () => {
            return this.repository.find({ relations });
        });
    }
    // Certain paramètres de la fonction sont facultatifs ce qui permet 
    // de réutiliser la même fonction pour plusieurs besoins
    async getOneById(id, relations, select) {
        return this.handleService("GET-ONEBYID", async () => {
            return this.repository.findOne({ where: { id }, relations, select });
        });
    }
    async getOneBySearchOptions(searchOptions, relations) {
        return this.handleService("GET-ONE-SEARCH", async () => {
            return this.repository.findOne({ where: searchOptions, relations });
        });
    }
    async getManyBySearchOptions(searchOptions, relations) {
        return this.handleService("GET-MANY", async () => {
            return this.repository.find({ where: searchOptions, relations });
        });
    }
    async create(body) {
        return this.handleService("CREATE", async () => {
            return this.repository.save(body);
        });
    }
    async delete(id) {
        return this.handleService("DELETE", async () => {
            return this.repository.delete(id);
        });
    }
    async update(id, body) {
        return this.handleService("UPDATE", async () => {
            const entityToUpdate = await this.repository.findOne({ where: { id } });
            return this.repository.save(this.repository.merge(entityToUpdate, body));
        });
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map