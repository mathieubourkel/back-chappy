import { dataBaseSource } from "../data-source";
import { UpdateUserDto, UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error.handler.middleware";

export class UserService {
  private userRepository =
    dataBaseSource.AppDataSource.getRepository<UserEntity>(UserEntity);


  async getByEmail(email:string):Promise<UserEntity>{
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      console.log("🚀 ~ UserService ~ getByEmail ~ error:", error)
      throw new CustomError("EMAIL_NOT_FOUND", 400, "Une erreur c'est produite lors de la récupération de vos données")
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
      throw new CustomError("CU-FAILED", 400, "Une erreur c'est produite lors de la création de votre compte");
    }
  }
  async hashPassword(password :string):Promise<string>{
    try {
      return await bcrypt.hash(password, 10)
    } catch (error) {
      
      throw new Error(error);
    }
  }

  async getById(id:number):Promise<UserEntity>{
    try {
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new CustomError("ID_NOT_FOUND", 400, "Une erreur c'est produite lors de la récupération de vos données")
    }
  }


  async update(id:number, body: UpdateUserDto): Promise<UserEntity>{
   
    try {
    const userUpdate = await this.getById(id);
    const passwordMatch = await bcrypt.compare(body.password, userUpdate.password);
    if (passwordMatch) {
        delete body.password; 
    } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
    }

    return this.userRepository.save(this.userRepository.merge(userUpdate, body));
    } catch (error) {
      throw new CustomError("UU-FAILED", 400, "Une erreur c'est produite lors de la modification de votre compte");
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      const user = await this.userRepository.find();
      return user;
    } catch (error) {
      console.error(
        "Erreor",
        error
      );
      throw new CustomError("GU-FAILED", 400, "Échec de la récupération de toutes les utilisateurs");
    }
  }

  async delete(id: number): Promise<unknown> {
    const company = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.delete(id);
  }
}
