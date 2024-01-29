import { EntityTarget, IsAny, Repository } from "typeorm";
import {CustomError} from "../utils/CustomError";
import { AppDataSource } from "../data-source";

export class Service {

  private repository:Repository<any>;
  // Dans chaque controlleur, on instancie un service avec comme paramètre
  // une entity
  // Cela permet d'utiliser un global "repository" dans les fonctions
  constructor(entity:EntityTarget<any>){
    this.repository = AppDataSource.getRepository(entity);
  }

  // Function global du service qui gère la logique du try/catch er des erreurs
  private async handleService<T>(name: string, callback: () => Promise<T>): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      // gestion des erreurs, renvoie une 500 car innatendu dans le service
      // ainsi qu'un tag "SER" puis le nom de la fonction en parametre
      // de chaque autres fonctions
      throw new CustomError(`SER-${name}`, 500, error.message);
    }
  }

  // chaque fonction appelle via callback la fonction globale
  async getAll<T>(relations?: Array<string>): Promise<T> {
    return this.handleService<T>("GET-ALL", async () => {
      return this.repository.find({ relations });
    });
  }

  // Certain paramètres de la fonction sont facultatifs ce qui permet 
  // de réutiliser la même fonction pour plusieurs besoins
  async getOneById(id: number, relations?: Array<string>, select?:any): Promise<unknown> {
    return this.handleService("GET-ONEBYID", async () => {
      return this.repository.findOne({ where:{id}, relations, select });
    });
  }

  async getOneBySearchOptions(searchOptions: {}, relations?: Array<string>, select?:any): Promise<unknown> {
    return this.handleService("GET-ONE-SEARCH", async () => {
      return this.repository.findOne({ where: searchOptions, relations, select });
    });
  }

  async getManyBySearchOptions(searchOptions: {}, relations?: Array<string>, select?:any): Promise<unknown> {
    return this.handleService("GET-MANY", async () => {
      return this.repository.find({ where: searchOptions, relations, select});
    });
  }

  async create(body: {}): Promise<unknown> {
    return this.handleService("CREATE", async () => {
      return this.repository.save(body);
    });
  }

  async delete(id: number): Promise<unknown> {
    return this.handleService("DELETE", async () => {
      return this.repository.delete(id);
    });
  }

  async update(id: number, body: {}, relations?: Array<string>, select?:any): Promise<any> {
    return this.handleService("UPDATE", async () => {
      const entityToUpdate = await this.repository.findOne({ where: { id } , relations, select});
      return this.repository.save(this.repository.merge(entityToUpdate, body));
    });
  }

  async exist(searchOptions: {}, relations?: Array<string>, select?:any): Promise<boolean> {
    return this.handleService("IF-EXIST", async () => {
      return this.repository.exist({ where: searchOptions, relations, select });
    });
  }
}
