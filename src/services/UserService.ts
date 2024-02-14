import { dataBaseSource } from "../data-source";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";

export class UserService {
  private userRepository =
    dataBaseSource.AppDataSource.getRepository<UserEntity>(UserEntity);


  async getByEmail(email:string):Promise<UserEntity>{
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new Error(error)
    }
  }
  async create(body: UserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.save(
        this.userRepository.create(body)
      );
      console.log(user);
      return user;
    } catch (error) {
      console.log("error", error);
      throw Error(error);
    }
  }
  async hashString(string :string):Promise<string>{
    try {
      return await bcrypt.hash(string, 10)
    } catch (error) {
      
      throw new Error(error);
    }
  }

  async update(id: number, body:any): Promise<UserEntity>{
   
    try {
      const errors = await validate(body);
      if (errors.length > 0) {
        const validationErrors = errors.map(error => Object.values(error.constraints)).join(', ');
        throw new Error(validationErrors);
      }
      const userUpdate = await this.userRepository.findOne({where: {id}});
    if (!userUpdate) {
      throw new Error("Utilisateur introuvable");
    }
    const passwordMatch = await bcrypt.compare(body.password, userUpdate.password);
    if (passwordMatch) {
        delete body.password; 
    } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
    }

    return this.userRepository.save(this.userRepository.merge(userUpdate, body));
    } catch (error) {
      throw Error(error)
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      const user = await this.userRepository.find();
      return user;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de toutes les entreprises :",
        error
      );
      throw new Error("Échec de la récupération de toutes les entreprises");
    }
  }

  async delete(id: number): Promise<unknown> {
    const company = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.delete(id);
  }
}
