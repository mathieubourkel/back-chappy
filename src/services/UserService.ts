import { dataBaseSource } from "../data-source";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";

export class UserService {
  private userRepository =
    dataBaseSource.AppDataSource.getRepository<UserEntity>(UserEntity);

  async create(body: UserDto): Promise<UserEntity> {
    try {
      const errors = await validate(body);
      if (errors.length > 0) {
        const validationErrors = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new Error(validationErrors);
      }
      const existingUser = await this.userRepository.findOne({
        where: { email: body.email },
      });
      console.log("email", body.email);
      if (existingUser) {
        throw new Error("Cette adresse e-mail est déjà utilisée.");
      }
      const hashedPassword = await bcrypt.hash(body.password, 10)
      const user = await this.userRepository.save(
        this.userRepository.create({ ...body, password: hashedPassword })
      );
      console.log(user);
      return user;
    } catch (error) {
      console.log("error", error);
      throw Error(error);
    }
  }

  async update(id: number, body:UserDto): Promise<UserEntity>{
   
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
