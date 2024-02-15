import { NextFunction, Request, Response } from "express";
import { dataBaseSource } from "../data-source";
import { UpdateUserDto, UserDto } from "../dto/user.dto";
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
      throw new Error(error)
    }
  }


  async update(req:Request, body: UpdateUserDto): Promise<UserEntity>{
   
    try {
    const userUpdate = await this.getById(+req.params.id);
    // const userUpdate = await this.userRepository.findOne({where: {id}});
    console.log("🚀 ~ UserService ~ update ~ userUpdate:", userUpdate)
    const passwordMatch = await bcrypt.compare(body.password, userUpdate.password);
    console.log("🚀 ~ UserService ~ update ~ passwordMatch:", passwordMatch)
    if (passwordMatch) {
        delete body.password; 
    } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        console.log("🚀 ~ UserService ~ update ~ hashedPassword:", hashedPassword)
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
