import { dataBaseSource } from "../data-source";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { TaskRoutes } from "../routes/task.routes";

export class UserService {
  private userRepository =
    dataBaseSource.AppDataSource.getRepository<UserEntity>(UserEntity);

  async create(body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;
    zip: string;
    city: string;
    phone: string;
  }): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    console.log("email", body.email);
    if (existingUser) {
      throw new Error("Cette adresse e-mail est déjà utilisée.");
    }
    const hashedPassword = await bcrypt.hash(body.password, 10)
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

  async update(id: number, body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string;
    zip: string;
    city: string;
    phone: string;
  }): Promise<UserEntity>{
    try {
      const userUpdate = await this.userRepository.findOne({where: {id}});
    if (!userUpdate) {
      throw new Error("Utilisateur introuvable");
    }
   
    // Vérifier si le mot de passe fourni correspond à celui de l'utilisateur dans la base de données
    const passwordMatch = await bcrypt.compare(body.password, userUpdate.password);

    // Mettre à jour tous les champs de l'utilisateur en fonction des valeurs fournies dans la requête
    if (passwordMatch) {
        // Si les mots de passe correspondent, ne mettez pas à jour le champ du mot de passe
        delete body.password; // Supprimer le champ du mot de passe des valeurs à mettre à jour
    } else {
        // Si les mots de passe ne correspondent pas, cryptez le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
    }

    // Fusionner les champs de l'utilisateur avec les valeurs fournies dans la requête
    // Sauvegarder les modifications dans la base de données
    return this.userRepository.save(this.userRepository.merge(userUpdate, body));
    } catch (error) {
      throw new Error(error)
    }
  }
}
