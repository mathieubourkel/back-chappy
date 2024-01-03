import { EntityTarget, Repository } from "typeorm";
import { dataBaseSource } from "../data-source";
import {CustomError} from "../utils/CustomError";

export class Service {

  private repository:Repository<unknown>;

  constructor(entity:EntityTarget<unknown>){
    this.repository = dataBaseSource.AppDataSource.getRepository(entity);
  }

  private async handleService(name: string, callback: () => Promise<any>): Promise<any> {
    try {
      return await callback();
    } catch (error) {
      throw new CustomError(`SER-${name}`, 500, error.message);
    }
  }

  async getAll(relations?: Array<string>): Promise<unknown> {
    return this.handleService("GET-ALL", async () => {
      return this.repository.find({ relations });
    });
  }

  async getOneById(id: number, relations?: Array<string>): Promise<unknown> {
    return this.handleService("GET-ONEBYID", async () => {
      return this.repository.findOne({ where:{id}, relations });
    });
  }

  async getOneBySearchOptions(searchOptions: {}, relations?: Array<string>): Promise<unknown> {
    return this.handleService("GET-ONE-SEARCH", async () => {
      return this.repository.findOne({ where: searchOptions, relations });
    });
  }

  async getManyBySearchOptions(searchOptions: {}, relations?: Array<string>): Promise<unknown> {
    return this.handleService("GET-MANY", async () => {
      return this.repository.find({ where: searchOptions, relations });
    });
  }

  async create(body: {}): Promise<unknown> {
    return this.handleService("CREATE", async () => {
      return this.repository.save(body);
    });
  }

  async delete(id: number): Promise<unknown> {
    return this.handleService("DELETE", async () => {
      return this.repository.remove(id);
    });
  }

  async update(id: number, body: {}): Promise<any> {
    return this.handleService("UPDATE", async () => {
      const entityToUpdate = await this.repository.findOne({ where: { id } });
      return this.repository.save(this.repository.merge(entityToUpdate, body));
    });
  }
}
