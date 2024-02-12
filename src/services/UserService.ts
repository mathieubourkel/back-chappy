import { dataBaseSource } from "../data-source";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";

export class UserService {
  private userRepository =
    dataBaseSource.AppDataSource.getRepository<UserEntity>(UserEntity);

  async create(body: {
    firstname: string, lastname: string, email: string, password: string, address: string, zip: string, city: string, phone: string
  }): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({where: {email: body.email}});
    console.log("email", body.email)
    if (existingUser) {
        throw new Error("Cette adresse e-mail est déjà utilisée.");
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
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
}
